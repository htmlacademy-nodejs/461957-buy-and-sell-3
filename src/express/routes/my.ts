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

myRouter.get(`/`, (req, res) => {
  const pageContent = {ticketsList, isLogged: true};
  res.render(`pages/tickets-list`, pageContent);
});
myRouter.get(`/comments`, (req, res) => {
  const pageContent = {isLogged: true};
  res.render(`pages/comments`, pageContent);
});

export = myRouter;
