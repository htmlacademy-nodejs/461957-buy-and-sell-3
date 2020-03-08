import {Ticket} from "../../types/ticket";
import {Category} from "../../types/category";

const ticket: Ticket = {
  title: `Мое старое кресло`,
  imageSrc: `http://localhost:63342/buy-and-sell-3/markup/img/item10.jpg`,
  imageSrcSet: `img/item10@2x.jpg 2x`,
  label: `ПРОДАМ`,
  color: `color10`,
  categoriesList: [`Дом`],
  price: `4000`,
  description: `Куплю монстеру зеленую в хорошем зеленом состоянии, буду поливать...`,
};

const categoriesList: Category[] = [
  {
    image: `/img/cat.jpg`,
    image2x: `/img/cat@2x.jpg`,
    title: `Дом`,
    count: `81`,
  },
  {
    image: `/img/cat02.jpg`,
    image2x: `/img/ca02@2x.jpg`,
    title: `Электроника`,
    count: `62`,
  },
  {
    image: `/img/cat03.jpg`,
    image2x: `/img/cat03@2x.jpg`,
    title: `Одежда`,
    count: `106`,
  },
  {
    image: `/img/cat04.jpg`,
    image2x: `/img/cat04@2x.jpg`,
    title: `Спорт/отдых`,
    count: `86`,
  },
  {
    image: `/img/cat05.jpg`,
    image2x: `/img/cat05@2x.jpg`,
    title: `Авто`,
    count: `34`,
  },
  {
    image: `/img/cat06.jpg`,
    image2x: `/img/cat06@2x.jpg`,
    title: `Книги`,
    count: `92`,
  },
];

function getTickets(count: number): Ticket[] {
  return new Array(count).map(() => ticket);
}

function getCategoriesList(count: number): Category[] {
  const mockLength = categoriesList.length;
  return new Array(count)
    .fill(undefined)
    .map(
      (item, index) =>
        categoriesList[getItemIndexFromLimitedCollection(index, mockLength)],
    );
}

function getItemIndexFromLimitedCollection(
  index: number,
  length: number,
): number {
  if (index <= length - 1) {
    return index;
  } else {
    return getItemIndexFromLimitedCollection(index - length, length);
  }
}

export = {getTickets, getCategoriesList};
