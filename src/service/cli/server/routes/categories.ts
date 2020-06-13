import {Router, Request, Response} from "express";
import offersService from "../services/offers.service";
import {getLogger} from "../logger";
import {HttpCodes} from "../../../../shared/http-codes";

const categoriesRouter: Router = Router();
const logger = getLogger();

categoriesRouter.get(`/`, async (req: Request, res: Response) => {
  try {
    res.json(await offersService.getCategories());
    logger.info(`End request with status code ${res.statusCode}`);
  } catch (e) {
    logger.error(e);
    res.status(HttpCodes.INTERNAL_SERVER_ERROR).send();
    logger.info(`End request with status code ${res.statusCode}`);
  }
});

export default categoriesRouter;
