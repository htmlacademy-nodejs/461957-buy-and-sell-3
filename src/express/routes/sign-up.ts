const {Router} = require(`express`);
const signUpRouter = new Router();

signUpRouter.get(`/`, (req, res) => res.render(`pages/sign-up`));

export = signUpRouter;
