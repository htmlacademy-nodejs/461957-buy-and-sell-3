import {CliAction} from "../../types/cli-action";
import {Offer} from "../../types/offer";
const fs = require('fs');
const {promisify} = require('util');
const writeFileAsync = promisify(fs.writeFile);
const {getRandomInt, shuffle} = require("../../utils");

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const TITLES = [
  `Продам книги Стивена Кинга`,
  `Продам новую приставку Sony Playstation 5`,
  `Продам отличную подборку фильмов на VHS`,
  `Куплю антиквариат`,
  `Куплю породистого кота`,
];
const SENTENCES = [
  `Товар в отличном состоянии.`,
  `Пользовались бережно и только по большим праздникам.`,
  `Продаю с болью в сердце...`,
  `Бонусом отдам все аксессуары.`,
  `Даю недельную гарантию.`,
  `Если товар не понравится — верну всё до последней копейки.`,
  `Это настоящая находка для коллекционера!`,
  `Если найдёте дешевле — сброшу цену.`,
  `Таких предложений больше нет!`,
  `При покупке с меня бесплатная доставка в черте города.`,
];
const CATEGORIES = [
  `Книги`,
  `Разное`,
  `Посуда`,
  `Игры`,
  `Животные`,
  `Журналы`,
];

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

function generateOffers(count: number): Offer[] {
  return Array(count).fill({}).map(() => ({
    category: [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]],
    description: shuffle(SENTENCES).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.min, PictureRestrict.max)),
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    sum: getRandomInt(SumRestrict.min, SumRestrict.max),
  }))
}

function getPictureFileName(amount: number): string {
  return amount > 10 ? `item${amount}.jpg` : `item0${amount}.jpg`
}

const cliAction: CliAction = {
  name: '--generate',
  run(args?) {
    const [count] = args;
    const countOffers = Number.parseInt(count, 10) || DEFAULT_COUNT;
    writeFileAsync(FILE_NAME, JSON.stringify(generateOffers(countOffers), undefined, 2));
  }
};

export = cliAction;
