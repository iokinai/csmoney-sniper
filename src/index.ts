import { getSteamPrice } from "./steamApi";
import { getCSMoneySkinsWithRecommendedPrice } from "./csmoneyApi";
import readline from "readline";
import CONSTS from "./consts";

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

const main = async () => {
  const price = parseFloat(
    await consoleInput("Enter the maximum price you are ready to pay: ")
  );

  const items = await getCSMoneySkinsWithRecommendedPrice({ price });

  for (const item of items) {
    const steamData = await getSteamPrice(item.asset.names.full);

    console.log("\n");
    console.log(`Item: ${item.asset.names.full}`);
    console.log(`CS.MONEY price: ${item.pricing.computed}`);
    console.log(`Steam highest buy order: ${steamData.highestBuyOrder}`);
    console.log(
      `Estimated earnings after Steam fee: ${(
        steamData.highestBuyOrder / CONSTS.STEAM_COMMISSION_MULTIPLIER
      ).toFixed(2)}`
    );

    await sleep(1000);
  }
};

main();
