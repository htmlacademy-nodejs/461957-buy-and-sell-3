import * as TExpress from "express";
import OffersService from "../services/offers-service";
import {HttpCodes} from "../../../../shared/http-codes";

const {Router} = require(`express`);

const offersRouter: TExpress.Router = new Router();
const offersService: OffersService = new OffersService();

offersRouter.get(`/`, async (req: TExpress.Request, res: TExpress.Response) => {
  res.json(await offersService.getOffers());
});
offersRouter.get(`/:id`, async (req: TExpress.Request, res: TExpress.Response) => {
  const offerId = Number.parseInt(req.params.id, 10);
  if (isNaN(offerId)) {
    res.status(HttpCodes.NOT_FOUND).send();
  } else {
    const offer = await offersService.getOfferById(offerId.toString());
    if (offer !== false) {
      res.json(offer);
    } else {
      res.status(HttpCodes.NOT_FOUND).send();
    }
  }
});

export = offersRouter;
