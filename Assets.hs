module Assets
where

import Control.Monad
import Data.Generics
import qualified Data.Map as M
import Language.ECMAScript3
import Language.ECMAScript3.PrettyPrint

type JS = JavaScript SourcePos

assetGetterName = "getAsset"

getLoadedAssets :: JS -> [String]
getLoadedAssets = everything (++) $ [] `mkQ` assetName
  where
    assetName :: Expression SourcePos -> [String]
    assetName  (CallExpr _ func args)
      | VarRef _ (Id _ funcName) <- func, funcName == assetGetterName,
        [StringLit _ assetName] <- args = [assetName]
    assetName _ = []

rewriteLoadedAssets :: M.Map String Int -> JS -> JS
rewriteLoadedAssets assetMap = everywhere $ mkT rewriteAssetName
  where
    rewriteAssetName :: Expression SourcePos -> Expression SourcePos
    rewriteAssetName (CallExpr x1 func args)
      | VarRef _ (Id _ funcName) <- func, funcName == assetGetterName,
        [StringLit x2 assetName] <- args
        = CallExpr x1 func [IntLit x2 (assetMap M.! assetName)]
    rewriteAssetName x = x
