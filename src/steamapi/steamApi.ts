import axios, { AxiosResponse } from "axios";
import CONSTS from "../consts";
import SteamItem, { ISteamItem } from "./steamItem";
import fs from "fs";

const getSteamItemNameID = async (
  marketName: string
): Promise<number | null> => {
  let result: AxiosResponse<any, any>;

  try {
    result = await axios.get(
      `${CONSTS.STEAMAPI_BASE_URL}${CONSTS.CS2_STEAM_ID}/${encodeURIComponent(
        marketName
      )}`
    );
  } catch (error) {
    console.error("Error fetching item name ID:", error);
    return null;
  }

  const match = result.data.match(/Market_LoadOrderSpread\s*\(\s*(\d+)\s*\)/);

  return match ? parseInt(match[1]) : null;
};

const getSteamPrice = async (marketName: string): Promise<SteamItem> => {
  const itemNameID = await getSteamItemNameID(marketName);

  if (itemNameID === null) {
    throw new Error("Failed to fetch item name ID from Steam API");
  }

  const result = await axios.get(
    `${CONSTS.STEAM_PRICE_URL}&${CONSTS.STEAM_PRICE_ITEMNAMEID}=${itemNameID}`,
    {
      headers: {
        Referer: `${CONSTS.STEAMAPI_BASE_URL}${
          CONSTS.CS2_STEAM_ID
        }/${encodeURIComponent(marketName)}`,
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
      },
    }
  );
  const rawData = result.data as ISteamItem;

  return new SteamItem(rawData);
};

export { getSteamPrice };
