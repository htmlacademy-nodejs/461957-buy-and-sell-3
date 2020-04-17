import {Router} from "express";
import categoriesRouter from "./categories";
import offersRouter from "./offers";
import searchRouter from "./search";

// eslint-disable-next-line new-cap
const apiRouter: Router = Router();

apiRouter.use(`/offers`, offersRouter);
apiRouter.use(`/categories`, categoriesRouter);
apiRouter.use(`/search`, searchRouter);

export default apiRouter;
