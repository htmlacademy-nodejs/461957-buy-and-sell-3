const {Router} = require(`express`);
const {
  getComments,
  getTickets,
  getCategoriesList,
} = require(`../services/data-provider`);
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
  const pageContent = {
    categoryId,
    categoryName: `categoryName`,
    ticketsCount: 62,
    ticketsList: getTickets(8),
    categoriesList: getCategoriesList(6),
  };
  res.render(`pages/category`, pageContent);
});
offersRouter.get(`/:id`, (req, res, next) => {
  const pageContent = {comments: getComments(2)};
  const offerId = Number.parseInt(req.params.id, 10);
  if (!isNaN(offerId)) {
    res.render(`pages/ticket`, pageContent);
  }
  next();
});

export = offersRouter;
