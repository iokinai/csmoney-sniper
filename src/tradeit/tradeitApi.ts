import axios from "axios";
import CONSTS from "../consts";
import { MarketAPI, GetSkinsInput } from "../marketApi";
import { TradeitItem, ITradeitItem } from "./tradeitItem";

export default class TradeitAPI implements MarketAPI {
  input: GetSkinsInput;

  constructor({ price, minPricePerc = 10, limit = 60 }: GetSkinsInput) {
    this.input = { price, minPricePerc, limit };
  }

  applyFilters(input: TradeitItem[]): TradeitItem[] {
    return input;
  }

  async loadSkins(): Promise<TradeitItem[]> {
    if (this.input.minPricePerc === undefined) {
      this.input.minPricePerc = 10;
    }

    const minPrice = this.input.price * (1 - this.input.minPricePerc / 100);

    const url = `${CONSTS.TRADEIT_BASE_URL}?${CONSTS.TRADEIT_GAMEID_PARAM}=${CONSTS.CS2_STEAM_ID}&${CONSTS.TRADEIT_OFFSET_PARAM}=0&${CONSTS.TRADEIT_LIMIT_PARAM}=${this.input.limit}&${CONSTS.TRADEIT_SORT_PARAM}=${CONSTS.TRADEIT_SORT_PARAM_DEFAULT}&${CONSTS.TRADEIT_MINPRICE_PARAM}=${minPrice}&${CONSTS.TRADEIT_MAXPRICE_PARAM}=${this.input.price}&${CONSTS.TRADEIT_STICKER_PARAM}=false&${CONSTS.TRADEIT_CONTEXT_PARAM}=${CONSTS.TRADEIT_CONTEXT_PARAM_DEFAULT}&${CONSTS.TRADEIT_ISFORSTORE_PARAM}=1`;
    const result = await axios.get(url);

    const items = result.data.items as ITradeitItem[];

    return TradeitItem.fromArray(items);
  }

  name(): string {
    return "tradeit.gg";
  }
}

// https://tradeit.gg/api/v2/inventory/data?gameId=730&offset=0&limit=120&sortType=Price+-+low&searchValue=&minPrice=18&maxPrice=20&minFloat=0&maxFloat=1&sticker=false&showTradeLock=true&onlyTradeLock=false&colors=&showUserListing=true&stickerName=&context=store&fresh=true&isForStore=1
