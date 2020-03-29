import {Request, Response, Router} from "express";
import offersService from "../services/offers.service";

const searchRouter: Router = Router();

searchRouter.get(``, async (req: Request, res: Response) => {
  const query = req.query.query;
  res.json(await offersService.searchByOfferTitle(query));
});

export default searchRouter;
