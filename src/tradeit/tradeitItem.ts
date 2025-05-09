import CONSTS from "../consts";
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

  get url(): string | null {
    const splitNameExterior = this.steamName.split(" (");
    const itemNameRaw = splitNameExterior[0]?.trim() ?? "";
    const exteriorRaw = splitNameExterior[1]?.replace(")", "").trim() ?? "";

    let addText = "";

    let itemName = itemNameRaw
      .replace("★", "")
      .trim()
      .replace(/\|/g, "")
      .replace(/\s+/g, "-")
      .replace("'", "")
      .toLowerCase();

    if (itemName.includes("stattrak™-")) {
      itemName = itemName.replace("stattrak™-", "");
      addText = "StatTrak ";
    }

    if (itemName.includes("souvenir")) {
      itemName = itemName.replace("souvenir", "");
      addText = "Souvenir ";
    }

    const exterior = addText + exteriorRaw;

    return `${
      CONSTS.TRADEIT_ITEM_BASE_URL
    }${itemName}?exterior=${encodeURIComponent(exterior)}`;
  }
  static fromArray(input: ITradeitItem[]): TradeitItem[] {
    return input.map((item: ITradeitItem) => new TradeitItem(item));
  }
}
