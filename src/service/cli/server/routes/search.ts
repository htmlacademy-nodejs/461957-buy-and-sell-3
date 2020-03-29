import {Request, Response, Router} from "express";
import OffersService from "../services/offers.service";

const searchRouter: Router = Router();
const offersService = new OffersService();

searchRouter.get(``, async (req: Request, res: Response) => {
  const query = req.query.query;
  res.json(await offersService.searchByOfferTitle(query));
});

export default searchRouter;
