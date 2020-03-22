import {Offer} from "../../../../types/offer";
import * as TExpress from "express";

const {MOCK_FILE_PATH} = require(`../../../../constants`);
const fs = require(`fs`).promises;
const {Router} = require(`express`);

const offersRouter: TExpress.Router = new Router();

offersRouter.get(`/`, async (req: TExpress.Request, res: TExpress.Response) => {
  let offersContent;
  try {
    const rawOffers = await fs.readFile(MOCK_FILE_PATH, `utf8`);
    offersContent = JSON.parse(rawOffers) as Offer[];
  } catch (e) {
    offersContent = [];
  }

  res.json(offersContent);
});

export = offersRouter;
