import axios from "axios";
import CONSTS from "../consts";
import { CSMoneyItem, ICSMoneyItem } from "./csmoneyItem";
import { MarketAPI, GetSkinsInput } from "../marketApi";

export default class CSMoneyAPI implements MarketAPI {
  input: GetSkinsInput;

  constructor({ price, minPricePerc = 10, limit = 60 }: GetSkinsInput) {
    this.input = { price, minPricePerc, limit };
  }

  withoutStickersFilter(items: CSMoneyItem[]): CSMoneyItem[] {
    return items.filter((item: CSMoneyItem) => {
      return item.stickers === null || item.stickers.length === 0;
    });
  }

  bestDiscountFilter(
    items: CSMoneyItem[],
    minDiscount: number = 0
  ): CSMoneyItem[] {
    const good = items.filter((item: CSMoneyItem) => {
      return item.pricing.discount >= minDiscount;
    });

    if (good.length > 0) return good;

    return this.bestDiscountFilter(items, minDiscount - 0.05);
  }

  applyFilters(input: CSMoneyItem[]): CSMoneyItem[] {
    let best = this.withoutStickersFilter(input);
    best = this.bestDiscountFilter(input);

    return best;
  }

  async loadSkins(): Promise<CSMoneyItem[]> {
    if (this.input.minPricePerc === undefined) {
      this.input.minPricePerc = 10;
    }

    const minPrice = this.input.price * (1 - this.input.minPricePerc / 100);

    const result = await axios.get(
      `${CONSTS.CSMONEY_BASE_URL}?${CONSTS.CSMONEY_LIMIT_PARAM}=${this.input.limit}&${CONSTS.CSMONEY_OFFSET_PARAM}=0&${CONSTS.CSMONEY_ORDER_PARAM}=${CONSTS.CSMONEY_ORDER_PARAM_VALUE}&${CONSTS.CSMONEY_SORT_PARAM}=${CONSTS.CSMONEY_SORT_PARAM_DEFAULT}&${CONSTS.CSMONEY_MINPRICE_PARAM}=${minPrice}&${CONSTS.CSMONEY_MAXPRICE_PARAM}=${this.input.price}&${CONSTS.CSMONEY_TYPES}`
    );

    if (!result.data) {
      throw new Error("No data received from CSMONEY API");
    }

    const items = result.data.items as ICSMoneyItem[];

    return CSMoneyItem.fromArray(items);
  }

  name(): string {
    return "cs.money";
  }
}
