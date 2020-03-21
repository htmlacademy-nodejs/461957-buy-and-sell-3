import {CliAction} from "../../types/cli-action";
import {Offer} from "../../types/offer";
import {OfferComment} from "../../types/offer-comment";

const fs = require(`fs`).promises;
const nanoid = require(`nanoid`);
const {getRandomInt, shuffle} = require(`../../utils`);
const chalk = require(`chalk`);
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const {ExitCode} = require(`../../constants`);

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
const CommentCountRestrict = {
  MIN: 0,
  MAX: 7,
};
const CommentMessageRescrict = {
  MIN: 1,
  MAX: 8,
};
const commentExamples: string[] = [
  `А сколько игр в комплекте?`,
  `Совсем немного...`,
  `С чем связана продажа? Почему так дешёво?`,
  `Продаю в связи с переездом. Отрываю от сердца.`,
  `Неплохо, но дорого`,
  `Оплата наличными или перевод на карту?`,
  `Вы что?! В магазине дешевле.`,
  `Почему в таком ужасном состоянии?`,
  `А где блок питания?`,
];

function generateOffers(count: number, categories: string[], sentences: string[], titles: string[]): Offer[] {
  return new Array(count).fill({}).map(() => ({
    id: nanoid(),
    category: [categories[getRandomInt(0, categories.length - 1)]],
    description: getDescription(sentences),
    picture: getPictureFileName(getRandomInt(PictureRestrict.min, PictureRestrict.max)),
    title: titles[getRandomInt(0, titles.length - 1)],
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    sum: getRandomInt(SumRestrict.min, SumRestrict.max),
    comments: getOffersComments(),
  }));
}

function getDescription(sentences: string[]): string {
  return shuffle(sentences)
    .slice(1, 5)
    .join(` `);
}

function getPictureFileName(amount: number): string {
  return amount > 10 ? `item${amount}.jpg` : `item0${amount}.jpg`;
}

function getComment(): OfferComment {
  return {
    id: nanoid(),
    text: shuffle(commentExamples)
      .slice(CommentMessageRescrict.MIN, getRandomInt(CommentMessageRescrict.MIN, CommentMessageRescrict.MAX))
      .join(` `),
  };
}
function getOffersComments(): OfferComment[] {
  return Array(getRandomInt(CommentCountRestrict.MIN, CommentCountRestrict.MAX))
    .fill(undefined)
    .map(() => getComment());
}

async function readMockFile(filePath: string): Promise<string[]> {
  try {
    const rawContent: string = await fs.readFile(filePath, `UTF8`);
    return rawContent
      .replace(/(\r\n)/gm, `\n`)
      .replace(/(\r)/gm, `\n`)
      .split(`\n`)
      .filter(value => !!value.length);
  } catch (e) {
    console.error(chalk.red(`Filed to read ${filePath}`));
    return [];
  }
}

const cliAction: CliAction = {
  name: `--generate`,
  async run(args?) {
    const [categories, sentences, titles] = await Promise.all([
      readMockFile(FILE_CATEGORIES_PATH),
      readMockFile(FILE_SENTENCES_PATH),
      readMockFile(FILE_TITLES_PATH),
    ]);
    const [count] = args;
    if (count > 1000) {
      console.error(chalk.red(`Не больше 1000 публикаций, введенное значение: ${count}`));
      process.exit(ExitCode.success);
    }
    const countOffers = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = generateOffers(countOffers, categories, sentences, titles);
    try {
      await fs.writeFile(FILE_NAME, JSON.stringify(content, undefined, 2));
      console.log(chalk.green(`${countOffers} offer(s) saved to ${FILE_NAME}`));
    } catch (e) {
      console.error(chalk.red(`Fail to write file ${FILE_NAME}`));
      console.error(chalk.red(e));
    }
  },
};

export = cliAction;
