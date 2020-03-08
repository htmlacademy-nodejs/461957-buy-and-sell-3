const {Router} = require(`express`);
const {getTickets} = require(`../services/data-provider`);
const searchRouter = new Router();

searchRouter.get(`/`, (req, res) => {
  const pageContent = {
    resultCount: 2,
    ticketsList: getTickets(2),
    suggestionsList: getTickets(8),
  };
  res.render(`pages/search-result`, pageContent);
});

export = searchRouter;
