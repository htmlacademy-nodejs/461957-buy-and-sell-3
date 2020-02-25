const {Router} = require(`express`);
const offersRouter = new Router();

offersRouter.get(`/add`, (req, res) => res.send(`/offers/add`));
offersRouter.get(`/category`, (req, res) => res.send(`/offers/category/:id ${req.params}`));

export = offersRouter;
