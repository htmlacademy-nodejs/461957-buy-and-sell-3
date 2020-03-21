import {IRouter} from "express";

const offersRouter = require(`./offers`);
const {Router} = require(`express`);

const apiRouter: IRouter = new Router();

apiRouter.use(`/offers`, offersRouter);

export = apiRouter;
