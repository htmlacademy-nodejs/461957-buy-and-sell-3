import {Router, Request, Response} from "express";
import OffersService from "../services/offers.service";
import {HttpCodes} from "../../../../shared/http-codes";
import {Offer} from "../../../../types/offer";
import {ValidationError} from "../errors/validation-error";

const offersRouter: Router = Router();
const offersService: OffersService = new OffersService();

offersRouter.get(`/`, async (req: Request, res: Response) => {
  res.json(await offersService.getOffers());
});
offersRouter.get(`/:id`, async (req: Request, res: Response) => {
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
offersRouter.post(`/`, async (req: Request, res: Response) => {
  const offer = req.body as Offer;
  try {
    res.send(await offersService.addOffer(offer));
  } catch (e) {
    if (e instanceof ValidationError) {
      res.status(HttpCodes.BAD_REQUEST).send(e.message);
    }
    res.status(HttpCodes.BAD_REQUEST).send();
  }
});

export default offersRouter;
