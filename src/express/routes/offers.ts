const {Router} = require(`express`);
const offersRouter = new Router();

offersRouter.get(`/add`, (req, res) => {
  const pageContent = {isLogged: true};
  res.render(`pages/new-ticket`, pageContent);
});
offersRouter.get(`/edit/:id`, (req, res) => {
  const offerId = Number.parseInt(req.params.id, 10);
  return res.send(`/offers/edit/${offerId}`);
});
offersRouter.get(`/category/:id`, (req, res) => {
  const categoryId = Number.parseInt(req.params.id, 10);
  return res.send(`/offers/category/${categoryId}`);
});
offersRouter.get(`/:id`, (req, res, next) => {
  const pageContent = {
    comments: [
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
    ]
  };
  const offerId = Number.parseInt(req.params.id, 10);
  if (!isNaN(offerId)) {
    res.render(`pages/ticket`, pageContent);
  }
  next();
});

export = offersRouter;
