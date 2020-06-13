import {Request, Response, Router} from "express";
import offersService from "../services/offers.service";
import {HttpCodes} from "../../../../shared/http-codes";
import {getLogger} from "../logger";

const searchRouter: Router = Router();
const logger = getLogger();

searchRouter.get(``, async (req: Request, res: Response) => {
  try {
    res.json(await offersService.searchByOfferTitle(req.query.query));
    logger.info(`End request with status code ${res.statusCode}`);
  } catch (e) {
    logger.error(e);
    res.status(HttpCodes.INTERNAL_SERVER_ERROR).send();
    logger.info(`End request with status code ${res.statusCode}`);
  }
});

export default searchRouter;
