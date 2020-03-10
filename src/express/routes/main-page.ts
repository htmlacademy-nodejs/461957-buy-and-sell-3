const {Router} = require(`express`);
const {getTickets, getCategoriesList} = require(`../services/data-provider`);
const mainPageRouter = new Router();

mainPageRouter.get(`/`, (req, res) => {
  const pageContent = {
    categoriesList: getCategoriesList(6),
    newTickets: getTickets(8),
    popularTickets: getTickets(4),
  };
  res.render(`pages/main`, pageContent);
});

export = mainPageRouter;
