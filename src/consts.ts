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
  STEAM_FEE_MULTIPLIER: 0.85,
  TRADEIT_BASE_URL: "https://tradeit.gg/api/v2/inventory/data",
  TRADEIT_GAMEID_PARAM: "gameId",
  TRADEIT_OFFSET_PARAM: "offset",
  TRADEIT_LIMIT_PARAM: "limit",
  TRADEIT_SORT_PARAM: "sortType",
  TRADEIT_SORT_PARAM_DEFAULT: "Price+-+low",
  TRADEIT_MINPRICE_PARAM: "minPrice",
  TRADEIT_MAXPRICE_PARAM: "maxPrice",
  TRADEIT_STICKER_PARAM: "sticker",
  TRADEIT_CONTEXT_PARAM: "context",
  TRADEIT_CONTEXT_PARAM_DEFAULT: "store",
  TRADEIT_ISFORSTORE_PARAM: "isForStore",
  TRADEIT_ITEM_BASE_URL: "https://tradeit.gg/ru/csgo/item/",

  DEFAULT_SLEEP_TIME: 4000,
};

export default CONSTS;
