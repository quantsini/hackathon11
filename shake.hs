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

bootJSFile = "js/bootstrap.js"

pngChannelCount = 3


dropDirectories 0 x = x
dropDirectories n x = dropDirectory1 $ dropDirectories (n-1) x

silentCommand = command_ [EchoStdout False, EchoStderr False]

showSize file = command_ [] "wc" ["-c", file]


getFileSize file = do
    need [file]
    (read . head . words . fromStdout) <$>
        command [] "wc" ["-c", file]

assetFileName x = "build/assetlist/" ++ x ++ ".assets"
localAssetFileName x = "build/assetlist/" ++ x ++ ".local-assets"

loadAssetList jsFile = lines <$> readFile' (assetFileName jsFile)
loadLocalAssetList jsFile = lines <$> readFile' (localAssetFileName jsFile)
loadMainAssetList = loadAssetList bootJSFile

minifiedAssetName f
  | ext `elem` ["js", "glsl", "vert", "frag"] = "build/minified/" ++ f
  | otherwise = f
  where ext = tail . takeExtension $ f

rewrittenJSName f = "build/rewritten/" ++ f

minifyJavascript in_ out = do
    need [in_]
    silentCommand "java"
        ["-jar", "deps/compiler.jar", "--js_output_file", out, "--js", in_]

replace _ _ [] = []
replace old new str
  | old `isPrefixOf` str = new ++ replace old new (drop (length old) str)
  | otherwise = head str : replace old new (tail str)

main = shakeArgs shakeOptions $ do
    phony "clean" $ do
        removeFilesAfter "build" ["//*"]

    want ["yelp.html", "y.png"]

    "yelp.html" *> \out -> do
        need ["y.png"]
        copyFile' ("build/" ++ out) out

    "y.png" *> \out -> do
        copyFile' ("build/" ++ out) out

    "build/yelp.html" *> \out -> do
        let jsFile = "build/loader.min.js"
            htmlFile = "html/loader.html"
        htmlContent <- readFile' htmlFile
        jsContent <- readFile' jsFile
        let htmlContent' = replace "__JS__" jsContent htmlContent
        writeFile' out htmlContent'
        showSize out

    "build/*.min.js" *> \out -> do
        let base = dropDirectory1 $ dropExtensions $ out
            in_ = "build/" ++ base ++ ".js"
        minifyJavascript in_ out

    "build/loader.js" *> \out -> do
        let in_ = "js/loader.js"
        jsContent <- readFile' in_
        blobSize <- getFileSize "build/y.padded.dat" :: Action Int
        scriptSize <- getFileSize $ minifiedAssetName bootJSFile :: Action Int
        let jsContent' =
                replace "__BLOBSIZE__" (show blobSize) $
                replace "__PNGWIDTH__" (show $ blobSize `div` pngChannelCount) $
                replace "__SCRIPTSIZE__" (show scriptSize) $ jsContent
        writeFile' out jsContent'

    "build/y.png" *> \out -> do
        let in_ = "build/y.clean.png"
        need [in_]
        exists <- liftIO $ doesFileExist out
        when exists $ liftIO $ removeFile out
        silentCommand "optipng" ["-out", out, in_]
        showSize out

    "build/y.clean.png" *> \out -> do
        let in_ = "build/y.unopt.png"
        need [in_]
        silentCommand "pngcp" [in_, out]
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
        let pixelCount = (size + pngChannelCount - 1) `div` pngChannelCount
        silentCommand "dd"
            ["if=" ++ in_, "of=" ++ out, "bs=" ++ show (pngChannelCount),
            "count=" ++ show pixelCount, "conv=sync"]

    "build/y.dat" *> \out -> do
        ins <- loadMainAssetList
        let ins' = map minifiedAssetName $ bootJSFile : ins
        need ins'
        silentCommand "python" $ ["packer.py", out] ++ ins'
        showSize out

    assetFileName "/*.js" *> \out -> do
        let jsFile = dropDirectories 2 $ dropExtension out
        jsAssets <- loadLocalAssetList jsFile
        transitiveAssetLists <- mapM loadAssetList $ filter ((== ".js") . takeExtension) jsAssets
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
        minifyJavascript in_ out

    map minifiedAssetName ["/*.glsl", "/*.vert", "/*.frag"] **> \out -> do
        let in_ = dropDirectories 2 $ out
        need [in_]
        content <- readFile' in_
        writeFile' out $ minifyShader content

    rewrittenJSName "/*.js" *> \out -> do
        let in_ = dropDirectories 2 $ out
        need [in_]
        assetList <- loadMainAssetList
        let assetMap = M.fromList $ zip assetList [0..]

        code <- liftIO $ parseFromFile in_
        let code' = rewriteLoadedAssets assetMap code
        writeFile' out $ show . prettyPrint $ code'


minifyShader xs = goSpaces2 $ goNewlines False $ goSpaces $ (unlines . map goComments . lines) $ xs
  where
    goComments ('/':'/':xs) = []
    goComments (x:xs) = x : goComments xs
    goComments [] = []

    goSpaces (' ':' ':xs) = goSpaces $ ' ':xs
    goSpaces (x:xs) = x : goSpaces xs
    goSpaces [] = []

    goNewlines _ ('#':xs) = '\n':'#':goNewlines True xs
    goNewlines True ('\n':xs) = '\n' : goNewlines False xs
    goNewlines False ('\n':xs) = goNewlines False xs
    goNewlines pp (x:xs) = x : goNewlines pp xs
    goNewlines _ [] = []

    goSpaces2 (a:' ':b:xs)
      | not (isIdent a) || not (isIdent b) = a : goSpaces2 (b:xs)
      where isIdent c = isAlphaNum c || c == '_'
    goSpaces2 (x:xs) = x : goSpaces2 xs
    goSpaces2 [] = []
