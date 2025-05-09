export type GetSkinsInput = {
  price: number;
  minPricePerc?: number;
  limit?: number;
};

export interface MarketItem {
  get price(): number;
  get steamName(): string;
}

export interface MarketAPI {
  loadSkins(): Promise<MarketItem[]>;
  applyFilters(input: MarketItem[]): MarketItem[];
}
