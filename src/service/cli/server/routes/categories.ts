import {Router, Request, Response} from "express";
import OffersService from "../services/offers.service";

const categoriesRouter: Router = Router();
const offersService: OffersService = new OffersService();

categoriesRouter.get(`/`, async (req: Request, res: Response) => {
  res.json(await offersService.getCategories());
})

export default categoriesRouter;
