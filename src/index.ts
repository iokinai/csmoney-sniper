import { getSteamPrice } from "./steamapi/steamApi";
import readline from "readline";
import CONSTS from "./consts";
import { MarketAPI } from "./marketApi";
import CSMoneyAPI from "./csmoney/csmoneyApi";
import TradeitAPI from "./tradeit/tradeitApi";
import { MarketSteamPair, MarketSteamTuple } from "./marketSteamTuple";
import { isProfitable, onlyProfitableSkins } from "./filters";
import SteamItem from "./steamapi/steamItem";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const consoleInput = (question: string): Promise<string> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
};

const loadAllSkinsAndOnlyShowProfitable = async (api: MarketAPI) => {
  let items = await api.loadSkins();
  items = api.applyFilters(items);

  let marketSteamTuple: MarketSteamTuple[] = [];

  let loadedItems = 0;

  for (const marketItem of items) {
    let steamItem: SteamItem;

    try {
      steamItem = await getSteamPrice(marketItem.steamName);
    } catch (error) {
      console.error(`Error: ${error}`);
      break;
    }

    marketSteamTuple.push([marketItem, steamItem]);

    console.clear();
    console.log(
      `Since Steam has a limit of 20 requests per minute, we have to load each item with a timeout. The timeout is ${
        CONSTS.DEFAULT_SLEEP_TIME / 1000
      }s.`
    );
    console.log(
      `Loaded ${++loadedItems} items of ${items.length}. It's ${(
        (loadedItems / items.length) *
        100
      ).toFixed(2)}%`
    );

    await sleep(CONSTS.DEFAULT_SLEEP_TIME);
  }

  marketSteamTuple = onlyProfitableSkins(marketSteamTuple);

  MarketSteamPair.fromTupleArray(marketSteamTuple).forEach(
    (item: MarketSteamPair) => {
      console.log(`Market: ${api.name()}`);
      console.log(
        `Item: ${item.marketItem.steamName}\nMarket price: \$${item.marketItem.price}\nSteam price (instant sale): \$${item.steamItem.highestBuyOrder}\nEarnings after fee (real income): \$${item.steamItem.highestBuyEarningAfterFee}\nProfit: \$${item.profit}\nMarket url: ${item.marketItem.url}`
      );
      console.log("\n");
    }
  );
};

const main = async () => {
  const price = parseFloat(
    await consoleInput(
      "Enter the maximum price you are ready to pay (in USD $): "
    )
  );

  let api: MarketAPI = new TradeitAPI({ price, limit: 10 });

  await loadAllSkinsAndOnlyShowProfitable(api);
};

main();
