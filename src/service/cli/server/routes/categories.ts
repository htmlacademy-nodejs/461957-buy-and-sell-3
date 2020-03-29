import {Router, Request, Response} from "express";
import offersService from "../services/offers.service";

const categoriesRouter: Router = Router();

categoriesRouter.get(`/`, async (req: Request, res: Response) => {
  res.json(await offersService.getCategories());
});

export default categoriesRouter;
