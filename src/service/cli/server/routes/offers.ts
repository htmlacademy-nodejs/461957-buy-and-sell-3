const {Router} = require(`express`);
const offersRouter = new Router();

offersRouter.get(`/`, (req, res) => res.send({response: `response`}));

export = offersRouter;
