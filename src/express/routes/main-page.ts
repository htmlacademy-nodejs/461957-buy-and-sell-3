const {Router} = require(`express`);
const {getTickets, getCategoriesList} = require(`../services/data-provider`);
const mainPageRouter = new Router();

mainPageRouter.get(`/`, (req, res) => {
  const pageContent = {
    categoriesList: getCategoriesList(16),
    tickets: getTickets(5),
  };
  res.render(`pages/main`, pageContent);
});

export = mainPageRouter;
