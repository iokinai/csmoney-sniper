const CONSTS = {
  CSMONEY_BASE_URL: "https://cs.money/2.0/market/sell-orders",
  CSMONEY_TYPES:
    "type=2&type=13&type=5&type=6&type=3&type=4&type=7&type=8&type=1&type=21",
  CSMONEY_LIMIT_PARAM: "limit",
  CSMONEY_OFFSET_PARAM: "offset",
  CSMONEY_SORT_PARAM: "sort",
  CSMONEY_SORT_PARAM_DEFAULT: "price",
  CSMONEY_MAXPRICE_PARAM: "maxPrice",
  CSMONEY_MINPRICE_PARAM: "minPrice",
  CSMONEY_ORDER_PARAM: "order",
  CSMONEY_ORDER_PARAM_VALUE: "asc",
  STEAMAPI_BASE_URL: "https://steamcommunity.com/market/listings/",
  CS2_STEAM_ID: "730",
  STEAM_PRICE_URL:
    "https://steamcommunity.com/market/itemordershistogram?country=MD&language=english&currency=1",
  STEAM_PRICE_ITEMNAMEID: "item_nameid",
  STEAM_COMMISSION_MULTIPLIER: 1.15,
};

export default CONSTS;
