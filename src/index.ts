import { getSteamPrice } from "./steamapi/steamApi";
import readline from "readline";
import CONSTS from "./consts";
import { MarketAPI } from "./marketApi";
import CSMoneyAPI from "./csmoney/csmoneyApi";
import TradeitAPI from "./tradeit/tradeitApi";
import { MarketSteamPair, MarketSteamTuple } from "./marketSteamTuple";
import { isProfitable, onlyProfitableSkins } from "./filters";

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

const liveLoadSkinsInfo = async (api: MarketAPI) => {
  let items = await api.loadSkins();
  items = api.applyFilters(items);

  for (const item of items) {
    const steamData = await getSteamPrice(item.steamName);

    console.log("\n");
    console.log(`Item: ${item.steamName}`);
    console.log(`Store price: ${item.price}`);
    console.log(`Steam highest buy order: ${steamData.highestBuyOrder}`);
    console.log(
      `Estimated earnings after Steam fee: ${(
        steamData.highestBuyOrder / CONSTS.STEAM_FEE_MULTIPLIER
      ).toFixed(2)}`
    );
    console.log(`Is profitable: ${isProfitable([item, steamData])}`);

    await sleep(CONSTS.DEFAULT_SLEEP_TIME);
  }
};

const loadAllSkinsAndOnlyShowProfitable = async (api: MarketAPI) => {
  let items = await api.loadSkins();
  items = api.applyFilters(items);

  let marketSteamTuple: MarketSteamTuple[] = [];

  let loadedItems = 0;

  for (const marketItem of items) {
    const steamItem = await getSteamPrice(marketItem.steamName);

    marketSteamTuple.push([marketItem, steamItem]);

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
      console.log(item.toString());
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
