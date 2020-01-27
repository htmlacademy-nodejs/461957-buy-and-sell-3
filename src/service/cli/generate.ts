import {CliAction} from "../../types/cli-action";
import {Offer} from "../../types/offer";
const fs = require(`fs`).promises;
const {getRandomInt, shuffle} = require(`../../utils`);
const chalk = require(`chalk`);
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const OfferType = {
  offer: `offer`,
  sale: `sale`,
};
const SumRestrict = {
  min: 1000,
  max: 100000,
};
const PictureRestrict = {
  min: 1,
  max: 16,
};

function generateOffers(count: number, categories: string[], sentences: string[], titles: string[]): Offer[] {
  return Array(count).fill({}).map(() => ({
    category: [categories[getRandomInt(0, categories.length - 1)]],
    description: shuffle(sentences).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.min, PictureRestrict.max)),
    title: titles[getRandomInt(0, titles.length - 1)],
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    sum: getRandomInt(SumRestrict.min, SumRestrict.max),
  }));
}

function getPictureFileName(amount: number): string {
  return amount > 10 ? `item${amount}.jpg` : `item0${amount}.jpg`;
}

async function readMockFile(filePath: string): Promise<string[]> {
  try {
    const rawContent: string = await fs.readFile(filePath, `UTF8`);
    return rawContent
      .replace(/(\r\n)/gm, `\n`)
      .replace(/(\r)/gm, `\n`)
      .split(`\n`)
      .filter((value) => !!value.length);
  } catch (e) {
    console.error(chalk.red(`Filed to read ${filePath}`));
    return [];
  }
}

const cliAction: CliAction = {
  name: `--generate`,
  async run(args?) {
    const categories = await readMockFile(FILE_CATEGORIES_PATH);
    const sentences = await readMockFile(FILE_SENTENCES_PATH);
    const titles = await readMockFile(FILE_TITLES_PATH);
    const [count] = args;
    const countOffers = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = generateOffers(countOffers, categories, sentences, titles);
    try {
      await fs.writeFile(FILE_NAME, JSON.stringify(content, undefined, 2));
      console.log(chalk.green(`${countOffers} offer(s) saved to ${FILE_NAME}`));
    } catch (e) {
      console.error(chalk.red(`Fail to write file ${FILE_NAME}`));
      console.error(chalk.red(e));
    }
  }
};

export = cliAction;
