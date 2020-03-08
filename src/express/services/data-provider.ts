import {Ticket} from "../../types/ticket";
import {Category} from "../../types/category";
import {TicketComment} from "../../types/ticket-comment";

const ticketsList: Ticket[] = [
  {
    title: `Ableton`,
    imageSrc: `http://localhost:63342/buy-and-sell-3/markup/img/item06.jpg`,
    imageSrcSet: `img/item06@2x.jpg 2x`,
    label: `ПРОДАМ`,
    color: `color06`,
    categoriesList: [`ЭЛЕКТРОНИКА`],
    price: `88 000`,
    description: `Куплю монстеру зеленую в хорошем зеленом состоянии, буду поливать...`,
  },
  {
    title: `Мое старое кресло`,
    imageSrc: `http://localhost:63342/buy-and-sell-3/markup/img/item10.jpg`,
    imageSrcSet: `img/item10@2x.jpg 2x`,
    label: `ПРОДАМ`,
    color: `color10`,
    categoriesList: [`Дом`],
    price: `4000`,
    description: `Куплю монстеру зеленую в хорошем зеленом состоянии, буду поливать...`,
  },
  {
    title: `Ableton`,
    imageSrc: `http://localhost:63342/buy-and-sell-3/markup/img/item06.jpg`,
    imageSrcSet: `img/item06@2x.jpg 2x`,
    label: `ПРОДАМ`,
    color: `color06`,
    categoriesList: [`ЭЛЕКТРОНИКА`],
    price: `88 000`,
    description: `Куплю монстеру зеленую в хорошем зеленом состоянии, буду поливать...`,
  },
  {
    title: `Мое старое кресло`,
    imageSrc: `http://localhost:63342/buy-and-sell-3/markup/img/item10.jpg`,
    imageSrcSet: `img/item10@2x.jpg 2x`,
    label: `ПРОДАМ`,
    color: `color10`,
    categoriesList: [`Дом`],
    price: `4000`,
    description: `Куплю монстеру зеленую в хорошем зеленом состоянии, буду поливать...`,
  },
  {
    title: `Ableton`,
    imageSrc: `http://localhost:63342/buy-and-sell-3/markup/img/item06.jpg`,
    imageSrcSet: `img/item06@2x.jpg 2x`,
    label: `ПРОДАМ`,
    color: `color06`,
    categoriesList: [`ЭЛЕКТРОНИКА`],
    price: `88 000`,
    description: `Куплю монстеру зеленую в хорошем зеленом состоянии, буду поливать...`,
  },
  {
    title: `Мое старое кресло`,
    imageSrc: `http://localhost:63342/buy-and-sell-3/markup/img/item10.jpg`,
    imageSrcSet: `img/item10@2x.jpg 2x`,
    label: `ПРОДАМ`,
    color: `color10`,
    categoriesList: [`Дом`],
    price: `4000`,
    description: `Куплю монстеру зеленую в хорошем зеленом состоянии, буду поливать...`,
  },
  {
    title: `Ableton`,
    imageSrc: `http://localhost:63342/buy-and-sell-3/markup/img/item06.jpg`,
    imageSrcSet: `img/item06@2x.jpg 2x`,
    label: `ПРОДАМ`,
    color: `color06`,
    categoriesList: [`ЭЛЕКТРОНИКА`],
    price: `88 000`,
    description: `Куплю монстеру зеленую в хорошем зеленом состоянии, буду поливать...`,
  },
  {
    title: `Мое старое кресло`,
    imageSrc: `http://localhost:63342/buy-and-sell-3/markup/img/item10.jpg`,
    imageSrcSet: `img/item10@2x.jpg 2x`,
    label: `ПРОДАМ`,
    color: `color10`,
    categoriesList: [`Дом`],
    price: `4000`,
    description: `Куплю монстеру зеленую в хорошем зеленом состоянии, буду поливать...`,
  },
];
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
const comments: TicketComment[] = [
  {
    author: `Александр Бурый`,
    authorImageSrc: `img/avatar03.jpg`,
    authorImageSrcSet: `img/avatar03@2x.jpg`,
    content: `А что с прогоном автомобиля? Также вижу на фото зимнюю резину. А летняя идет ли впридачу?`,
  },
  {
    author: `Анатолий Хакимов`,
    authorImageSrc: `img/avatar04.jpg`,
    authorImageSrcSet: `img/avatar04@2x.jpg`,
    content: `Хочу прийти посмотреть на авто в среду. Мой телефон 89254455566. Готовы принять?`,
  },
  {
    author: `Георгий Шпиц`,
    authorImageSrc: `img/avatar02.jpg`,
    authorImageSrcSet: `img/avatar02@2x.jpg`,
    content: `Что это за рухлядь? Стыдно такое даже фотографировать, не то, что продавать.`,
  },
];

function getTickets(count: number): Ticket[] {
  return generateCollectionOfLength<Ticket>(ticketsList, count);
}

function getCategoriesList(count: number): Category[] {
  return generateCollectionOfLength<Category>(categoriesList, count);
}

function getComments(count: number): TicketComment[] {
  return generateCollectionOfLength<TicketComment>(comments, count);
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

function generateCollectionOfLength<T>(mocks: T[], count: number): T[] {
  return new Array(count)
    .fill(undefined)
    .map(
      (item, index) =>
        mocks[
          getItemIndexFromLimitedCollection(index, mocks.length)
          ],
    );
}

export = {getTickets, getCategoriesList, getComments};
