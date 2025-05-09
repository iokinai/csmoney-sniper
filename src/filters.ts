import { MarketItem } from "./marketApi";
import { MarketSteamTuple } from "./marketSteamTuple";
import SteamItem from "./steamapi/steamItem";

export const onlyProfitableSkins = (skins: MarketSteamTuple[]) => {
  return skins.filter(([market, steam]) => {
    return steam.highestBuyEarningAfterFee > market.price;
  });
};

export const isProfitable = ([market, steam]: MarketSteamTuple): boolean => {
  return steam.highestBuyEarningAfterFee > market.price;
};
