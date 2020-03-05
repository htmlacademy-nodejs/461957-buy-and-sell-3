const {Router} = require(`express`);
const mainPageRouter = new Router();

mainPageRouter.get(`/`, (req, res) => {
  const pageContent = {
    categoriesList: [
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
    ],
  };
  res.render(`pages/main`, pageContent);
});

export = mainPageRouter;
