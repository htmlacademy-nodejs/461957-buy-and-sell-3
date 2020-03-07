const {Router} = require(`express`);
const myRouter = new Router();

myRouter.get(`/`, (req, res) => res.render(`pages/tickets-list`));
myRouter.get(`/comments`, (req, res) => res.send(`/my/comments`));

export = myRouter;
