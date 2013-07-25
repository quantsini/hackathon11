import Control.Applicative hiding ((*>))
import Control.Monad
import Control.Monad.Trans.Class
import Control.Monad.Trans.Writer
import Data.Char
import Data.List
import qualified Data.Map as M
import Data.Maybe
import qualified Data.Set as S
import Development.Shake hiding (doesFileExist)
import Development.Shake.FilePath
import System.Directory
import System.Environment hiding (getEnv)

import Assets
import Language.ECMAScript3.Parser
import Language.ECMAScript3.PrettyPrint

import Debug.Trace

mainJSFile = "js/main.js"

pngChannelCount = 3


dropDirectories 0 x = x
dropDirectories n x = dropDirectory1 $ dropDirectories (n-1) x

silentCommand = command_ [EchoStdout False, EchoStderr False]

showSize file = command_ [] "wc" ["-c", file]


clean = do
    putStrLn "TODO: don't know how to clean"
    return ()

getFileSize file = do
    need [file]
    (read . head . words . fromStdout) <$>
        command [] "wc" ["-c", file]

assetFileName x = "build/assetlist/" ++ x ++ ".assets"
localAssetFileName x = "build/assetlist/" ++ x ++ ".local-assets"

loadAssetList jsFile = lines <$> readFile' (assetFileName jsFile)
loadLocalAssetList jsFile = lines <$> readFile' (localAssetFileName jsFile)
loadMainAssetList = loadAssetList mainJSFile

minifiedAssetName f
  | ext `elem` ["js", "glsl", "vert", "frag"] = "build/minified/" ++ f
  | otherwise = f
  where ext = tail . takeExtension $ f

rewrittenJSName f = "build/rewritten/" ++ f

main = shakeArgs shakeOptions $ do
    phony "clean" $ do
        removeFilesAfter "build" ["//*"]

    "build/y.png" *> \out -> do
        let in_ = "build/y.unopt.png"
        need [in_]
        exists <- liftIO $ doesFileExist out
        when exists $ liftIO $ removeFile out
        silentCommand "pngcrush" [in_, out]
        showSize out

    "build/y.unopt.png" *> \out -> do
        let in_ = "build/y.padded.dat"
        need [in_]
        width <- (`div` pngChannelCount) <$> getFileSize in_
        silentCommand "convert" ["-size", show width ++ "x1", "-depth", "8", "rgb:" ++ in_, out]
        showSize out

    "build/y.padded.dat" *> \out -> do
        let in_ = "build/y.dat"
        need [in_]
        size <- getFileSize in_
        let padding = (pngChannelCount - size) `mod` pngChannelCount
        silentCommand "dd" ["if=" ++ in_, "of=" ++ out]
        when (padding /= 0) $ silentCommand "dd"
            ["if=/dev/zero", "of=" ++ out, "bs=" ++ show padding, "count=1",
            "conv=notrunc", "oflag=append"]

    "build/y.dat" *> \out -> do
        ins <- loadMainAssetList
        let ins' = map minifiedAssetName $ mainJSFile : ins
        need ins'
        silentCommand "python" $ ["packer.py", out] ++ ins'
        showSize out

    assetFileName "/*.js" *> \out -> do
        let jsFile = dropDirectories 2 $ dropExtension out
        jsAssets <- loadLocalAssetList jsFile
        transitiveAssetLists <- mapM loadAssetList $ filter ((== "js") . takeExtension) jsAssets
        let fullAssetList = S.unions (S.fromList jsAssets : map S.fromList transitiveAssetLists)
        writeFile' out $ unlines . S.toList $ fullAssetList

    localAssetFileName "/*.js" *> \out -> do
        let jsFile = dropDirectories 2 $ dropExtension out
        need [jsFile]

        code <- liftIO $ parseFromFile jsFile
        let assets = getLoadedAssets code
        writeFile' out $ unlines assets

    minifiedAssetName "/*.js" *> \out -> do
        let in_ = rewrittenJSName $ dropDirectories 2 $ out
        need [in_]
        silentCommand "java"
            ["-jar", "deps/compiler.jar", "--js_output_file", out, "--js", in_]

    map minifiedAssetName ["/*.glsl", "/*.vert", "/*.frag"] **> \out -> do
        let in_ = dropDirectories 2 $ out
        need [in_]
        copyFile' in_ out
        --silentCommand "mono"
            --["deps/shader_minifier.exe", "--preserve-externals", "-o", out, in_]

    rewrittenJSName "/*.js" *> \out -> do
        let in_ = dropDirectories 2 $ out
        need [in_]
        assetList <- loadMainAssetList
        let assetMap = M.fromList $ zip assetList [0..]

        code <- liftIO $ parseFromFile in_
        let code' = rewriteLoadedAssets assetMap code
        writeFile' out $ show . prettyPrint $ code'
