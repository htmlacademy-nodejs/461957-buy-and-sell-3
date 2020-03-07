const {Router} = require(`express`);
const myRouter = new Router();

const ticketsList = [
  {
    title: `Ableton`,
    imageSrc: `http://localhost:63342/buy-and-sell-3/markup/img/item06.jpg`,
    imageSrcSet: `img/item06@2x.jpg 2x`,
    label: `ПРОДАМ`,
    color: `color06`,
    categoriesList: [`ЭЛЕКТРОНИКА`],
    price: `88 000`,
  },
  {
    title: `Мое старое кресло`,
    imageSrc: `http://localhost:63342/buy-and-sell-3/markup/img/item10.jpg`,
    imageSrcSet: `img/item10@2x.jpg 2x`,
    label: `ПРОДАМ`,
    color: `color10`,
    categoriesList: [`Дом`],
    price: `4000`,
  },
  {
    title: `Кофеварка`,
    imageSrc: `http://localhost:63342/buy-and-sell-3/markup/img/item04.jpg`,
    imageSrcSet: `img/item04@2x.jpg 2x`,
    label: `КУПЛЮ`,
    color: `color04`,
    categoriesList: [`Дом`],
    price: `2000`,
  },
  {
    title: `Фотик Canon`,
    imageSrc: `http://localhost:63342/buy-and-sell-3/markup/img/item08.jpg`,
    imageSrcSet: `img/item08@2x.jpg 2x`,
    label: `КУПЛЮ`,
    color: `color08`,
    categoriesList: [`ЭЛЕКТРОНИКА`],
    price: `32 000`,
  },
  {
    title: `Монстера`,
    imageSrc: `http://localhost:63342/buy-and-sell-3/markup/img/item01.jpg`,
    imageSrcSet: `img/item01@2x.jpg 2x`,
    label: `КУПЛЮ`,
    color: `color01`,
    categoriesList: [`Дом`],
    price: `1000`,
  },
];
const commentsList = [
  {
    ticketHeader: {
      title: `Ленд Ровер`,
      price: `900 000`,
      type: `ПРОДАМ`,
    },
    comments: [
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
    ],
  },
  {
    ticketHeader: {
      title: `Ableton`,
      price: `900 000`,
      type: `ПРОДАМ`,
    },
    comments: [
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
    ],
  },
];

myRouter.get(`/`, (req, res) => {
  const pageContent = {ticketsList, isLogged: true};
  res.render(`pages/tickets-list`, pageContent);
});
myRouter.get(`/comments`, (req, res) => {
  const pageContent = {commentsList, isLogged: true};
  res.render(`pages/comments`, pageContent);
});

export = myRouter;
