type SteamItemGraphArray = [number, number, string];

interface ISteamItemGraph {
  price: number;
  count: number;
  text: string;
}

class SteamItemGraph implements ISteamItemGraph {
  price: number;
  count: number;
  text: string;

  constructor(data: SteamItemGraphArray) {
    this.price = data[0];
    this.count = data[1];
    this.text = data[2];
  }

  static fromArray(data: SteamItemGraphArray[]): ISteamItemGraph[] {
    return data.map((item) => new SteamItemGraph(item));
  }
}

export { SteamItemGraphArray, ISteamItemGraph, SteamItemGraph };
export default SteamItemGraph;
