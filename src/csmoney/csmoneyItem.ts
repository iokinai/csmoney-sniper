import { MarketItem } from "../marketApi";
import CSMoneyAsset from "./csmoneyAsset";
import CSMoneyPricing from "./csmoneyPricing";
import CSMoneySeller from "./csmoneySeller";

export interface ICSMoneyItem {
  id: number;
  appId: number;
  seller: CSMoneySeller;
  asset: CSMoneyAsset;
  stickers: any[];
  pricing: CSMoneyPricing;
}

export class CSMoneyItem implements ICSMoneyItem, MarketItem {
  get price(): number {
    return this.pricing.computed;
  }
  get steamName(): string {
    return this.asset.names.full;
  }

  get url(): string | null {
    return null;
  }

  id: number;
  appId: number;
  seller: CSMoneySeller;
  asset: CSMoneyAsset;
  stickers: any[];
  pricing: CSMoneyPricing;

  constructor(item: ICSMoneyItem) {
    this.id = item.id;
    this.appId = item.appId;
    this.seller = item.seller;
    this.asset = item.asset;
    this.stickers = item.stickers;
    this.pricing = item.pricing;
  }

  static fromArray(items: ICSMoneyItem[]): CSMoneyItem[] {
    return items.map((item: ICSMoneyItem) => new CSMoneyItem(item));
  }
}
