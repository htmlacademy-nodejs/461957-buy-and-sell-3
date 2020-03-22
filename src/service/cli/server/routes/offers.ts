import * as TExpress from "express";
import OffersService from "../services/offers-service";

const {Router} = require(`express`);

const offersRouter: TExpress.Router = new Router();
const offersService: OffersService = new OffersService();

offersRouter.get(`/`, async (req: TExpress.Request, res: TExpress.Response) => {
  res.json(await offersService.getOffers());
});

export = offersRouter;
