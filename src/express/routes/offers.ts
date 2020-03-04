const {Router} = require(`express`);
const offersRouter = new Router();

offersRouter.get(`/add`, (req, res) => res.render(`pages/new-ticket`));
offersRouter.get(`/edit/:id`, (req, res) => {
  const offerId = Number.parseInt(req.params.id, 10);
  return res.send(`/offers/edit/${offerId}`);
});
offersRouter.get(`/category/:id`, (req, res) => {
  const categoryId = Number.parseInt(req.params.id, 10);
  return res.send(`/offers/category/${categoryId}`);
});
offersRouter.get(`/:id`, (req, res, next) => {
  const offerId = Number.parseInt(req.params.id, 10);
  if (!isNaN(offerId)) {
    return res.send(`/offers/${offerId}`);
  }
  next();
});

export = offersRouter;
