const {Router} = require(`express`);
const {getComments, getTickets} = require(`../services/data-provider`);
const myRouter = new Router();

const commentsList = [
  {
    ticketHeader: {
      title: `Ленд Ровер`,
      price: `900 000`,
      type: `ПРОДАМ`,
    },
    comments: getComments(3),
  },
  {
    ticketHeader: {
      title: `Ableton`,
      price: `900 000`,
      type: `ПРОДАМ`,
    },
    comments: getComments(3),
  },
];

myRouter.get(`/`, (req, res) => {
  const pageContent = {ticketsList: getTickets(5), isLogged: true};
  res.render(`pages/my-tickets`, pageContent);
});
myRouter.get(`/comments`, (req, res) => {
  const pageContent = {commentsList, isLogged: true};
  res.render(`pages/comments`, pageContent);
});

export = myRouter;
