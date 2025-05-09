import CSMoneyAsset from "./csmoneyAsset";
import CSMoneyPricing from "./csmoneyPricing";
import CSMoneySeller from "./csmoneySeller";

export default interface CSMoneyItem {
  id: number;
  appId: number;
  seller: CSMoneySeller;
  asset: CSMoneyAsset;
  stickers: any[];
  pricing: CSMoneyPricing;
}
