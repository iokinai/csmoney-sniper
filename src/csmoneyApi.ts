import axios from "axios";
import CONSTS from "./consts";
import CSMoneyItem from "./csmoney/csmoneyItem";
import { bestDiscountFilter, withoutStickersFilter } from "./filters";

type GetCSMoneySkinsInput = {
  price: number;
  limit?: number;
  minPricePerc?: number;
};

export const getCSMoneySkinsWithRecommendedPrice = async ({
  price,
  limit = 60,
  minPricePerc = 10,
}: GetCSMoneySkinsInput): Promise<CSMoneyItem[]> => {
  const minPrice = price * (1 - minPricePerc / 100);

  const result = await axios.get(
    `${CONSTS.CSMONEY_BASE_URL}?${CONSTS.CSMONEY_LIMIT_PARAM}=${limit}&${CONSTS.CSMONEY_OFFSET_PARAM}=0&${CONSTS.CSMONEY_ORDER_PARAM}=${CONSTS.CSMONEY_ORDER_PARAM_VALUE}&${CONSTS.CSMONEY_SORT_PARAM}=${CONSTS.CSMONEY_SORT_PARAM_DEFAULT}&${CONSTS.CSMONEY_MINPRICE_PARAM}=${minPrice}&${CONSTS.CSMONEY_MAXPRICE_PARAM}=${price}&${CONSTS.CSMONEY_TYPES}`
  );

  if (!result.data) {
    throw new Error("No data received from CSMONEY API");
  }

  const items = result.data.items as CSMoneyItem[];

  return filterCSMoneyItems(items);
};

const filterCSMoneyItems = (items: CSMoneyItem[]): CSMoneyItem[] => {
  let bestItems = withoutStickersFilter(items);
  bestItems = bestDiscountFilter(items);

  return bestItems;
};
