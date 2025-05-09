import { MarketItem } from "./marketApi";
import SteamItem from "./steamapi/steamItem";

export type MarketSteamTuple = [MarketItem, SteamItem];

export class MarketSteamPair {
  constructor(public marketItem: MarketItem, public steamItem: SteamItem) {}

  static fromTuple(tuple: MarketSteamTuple): MarketSteamPair {
    return new MarketSteamPair(tuple[0], tuple[1]);
  }

  static fromTupleArray(tarr: MarketSteamTuple[]): MarketSteamPair[] {
    return tarr.map((item: MarketSteamTuple) =>
      MarketSteamPair.fromTuple(item)
    );
  }

  public get profit(): number {
    return Math.round(
      this.steamItem.highestBuyEarningAfterFee - this.marketItem.price
    );
  }

  public toTuple(): MarketSteamTuple {
    return [this.marketItem, this.steamItem];
  }

  private _tostring(): string {
    return `Item: ${this.marketItem.steamName}\nMarket price: ${this.marketItem.price}\nSteam price: ${this.steamItem.highestBuyEarningAfterFee}\nProfit: ${this.profit}`;
  }

  public toString(): string {
    return this._tostring();
  }

  public get [Symbol.toStringTag](): string {
    return this._tostring();
  }
}
