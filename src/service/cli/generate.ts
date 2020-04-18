import {CliAction} from "../../types/cli-action";
import {Offer, OfferType} from "../../types/offer";
import {OfferComment} from "../../types/offer-comment";

const fs = require(`fs`).promises;
const nanoid = require(`nanoid`);
const {getRandomInt, shuffle} = require(`../../utils`);
const chalk = require(`chalk`);
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`;
const {ExitCode} = require(`../../constants`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;

const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};
const PictureRestrict = {
  MIN: 1,
  MAX: 16,
};
const DescriptionRestrict = {
  MIN: 1,
  MAX: 5,
};
const CommentCountRestrict = {
  MIN: 0,
  MAX: 7,
};
const CommentMessageRescrict = {
  MIN: 1,
  MAX: 8,
};

let isTestCase: boolean = true;

function generateOffers(count: number, categories: string[], sentences: string[], titles: string[], comments: string[]): Offer[] {
  return new Array(count).fill({}).map(() => ({
    id: getId(),
    category: [categories[getRandomInt(0, categories.length - 1)]],
    description: getDescription(sentences),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    title: titles[getRandomInt(0, titles.length - 1)],
    type: getType(),
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
    comments: getOffersComments(comments),
  }));
}

function getId(): string {
  if (isTestCase) {
    isTestCase = false;
    return `test-id-for-object-00-00-00-00-1d-id`;
  }
  return nanoid();
}

function getType(): OfferType {
  return Math.random() > 0.5 ? OfferType.BUY : OfferType.SELL;
}

function getDescription(sentences: string[]): string {
  return shuffle(sentences).splice(0, getRandomInt(DescriptionRestrict.MIN, DescriptionRestrict.MAX)).join(` `);
}

function getPictureFileName(amount: number): string {
  return amount > 10 ? `item${amount}.jpg` : `item0${amount}.jpg`;
}

function getComment(comments: string[]): OfferComment {
  return {
    id: nanoid(),
    text: shuffle(comments).splice(0, getRandomInt(CommentMessageRescrict.MIN, CommentMessageRescrict.MAX)).join(` `),
  };
}

function getOffersComments(comments: string[]): OfferComment[] {
  return Array(getRandomInt(CommentCountRestrict.MIN, CommentCountRestrict.MAX))
    .fill(undefined)
    .map(() => getComment(comments));
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
    console.error(e);
    return [];
  }
}

const cliAction: CliAction = {
  name: `--generate`,
  async run(args?) {
    const [categories, sentences, titles, comments] = await Promise.all([
      readMockFile(FILE_CATEGORIES_PATH),
      readMockFile(FILE_SENTENCES_PATH),
      readMockFile(FILE_TITLES_PATH),
      readMockFile(FILE_COMMENTS_PATH),
    ]);
    const [count] = args;
    if (count > 1000) {
      console.error(chalk.red(`Не больше 1000 публикаций, введенное значение: ${count}`));
      process.exit(ExitCode.success);
    }
    const countOffers = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = generateOffers(countOffers, categories, sentences, titles, comments);
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
