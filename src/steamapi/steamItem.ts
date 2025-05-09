import { SteamItemGraphArray, SteamItemGraph } from "./steamItemGraph";

export interface ISteamItem {
  success: number;
  highest_buy_order: number;
  lowest_sell_order: number;
  buy_order_graph: SteamItemGraphArray[];
}

class UnsafeSteamItem implements ISteamItem {
  success: number;
  highest_buy_order: number;
  lowest_sell_order: number;
  buy_order_graph: SteamItemGraphArray[];

  constructor(data: ISteamItem) {
    this.success = data.success;
    this.highest_buy_order = data.highest_buy_order;
    this.lowest_sell_order = data.lowest_sell_order;
    this.buy_order_graph = data.buy_order_graph;
  }
}

export default class SteamItem {
  private item: UnsafeSteamItem;

  constructor(data: ISteamItem) {
    this.item = new UnsafeSteamItem(data);
  }

  public get highestBuyOrder(): number {
    return this.item.highest_buy_order / 100;
  }

  public get lowestSellOrder(): number {
    return this.item.lowest_sell_order / 100;
  }

  public get buyOrderGraph(): SteamItemGraph[] {
    return SteamItemGraph.fromArray(this.item.buy_order_graph);
  }

  public get success(): number {
    return this.item.success;
  }
}
