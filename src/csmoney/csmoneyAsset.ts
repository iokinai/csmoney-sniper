import CSMoneyAssetImages from "./csmoneyAssetImages";
import CSMoneyAssetNames from "./csmoneyAssetNames";

export default interface CSMoneyAsset {
  id: number;
  names: CSMoneyAssetNames;
  images: CSMoneyAssetImages;
  isSouvenir: boolean;
  isStatTrak: boolean;
  rarity: string;
  pattern: number;
}
