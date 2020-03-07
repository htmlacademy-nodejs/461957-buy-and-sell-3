const {Router} = require(`express`);
const searchRouter = new Router();

const ticketsList = [
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

searchRouter.get(`/`, (req, res) => {
  const pageContent = {
    resultCount: 2,
    ticketsList,
  };
  res.render(`pages/search`, pageContent);
});

export = searchRouter;
