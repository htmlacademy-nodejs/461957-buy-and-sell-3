import {IRouter} from "express";
import categoriesRouter from "./categories";

const offersRouter = require(`./offers`);
const {Router} = require(`express`);

const apiRouter: IRouter = new Router();

apiRouter.use(`/offers`, offersRouter);
apiRouter.use(`/categories`, categoriesRouter);

export = apiRouter;
