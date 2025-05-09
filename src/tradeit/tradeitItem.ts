import { MarketItem } from "../marketApi";

export interface ITradeitItem {
  name: string;
  storePrice: number;
  hasStickers: boolean;
}

class UnsafeTradeitItem implements ITradeitItem {
  name: string;
  storePrice: number;
  hasStickers: boolean;

  constructor(item: ITradeitItem) {
    this.name = item.name;
    this.storePrice = item.storePrice;
    this.hasStickers = item.hasStickers;
  }
}

export class TradeitItem implements MarketItem {
  item: UnsafeTradeitItem;

  constructor(item: ITradeitItem) {
    this.item = new UnsafeTradeitItem(item);
  }

  get price(): number {
    return this.item.storePrice / 100;
  }
  get steamName(): string {
    return this.item.name;
  }

  static fromArray(input: ITradeitItem[]): TradeitItem[] {
    return input.map((item: ITradeitItem) => new TradeitItem(item));
  }
}
