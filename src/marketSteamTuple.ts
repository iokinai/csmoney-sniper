import { MarketItem } from "./marketApi";
import SteamItem from "./steamapi/steamItem";
import { round2 } from "./utils";

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
    return round2(
      this.steamItem.highestBuyEarningAfterFee - this.marketItem.price
    );
  }

  public toTuple(): MarketSteamTuple {
    return [this.marketItem, this.steamItem];
  }
}
