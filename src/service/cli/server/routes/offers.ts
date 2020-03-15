import {Offer} from "../../../../types/offer";

const {MOCK_FILE_PATH} = require(`../../../../constants`);
const fs = require(`fs`).promises;

const {Router} = require(`express`);
const offersRouter = new Router();

offersRouter.get(`/`, async (req, res) => {
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
