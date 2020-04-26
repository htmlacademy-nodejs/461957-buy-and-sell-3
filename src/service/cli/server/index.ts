import express from "express";
import apiRouter from "./routes/api";
import {DEFAULT_PORT} from "../../../shared/variables";
import {getLogger} from "./logger";
import * as bodyParser from "body-parser";

export const app = express();
const logger = getLogger();

app.use(bodyParser.json());
app.use((req, res, next) => {
  logger.debug(`Start request to url ${req.url}`);
  next();
});
app.use(`/api`, apiRouter);

export function runServer(args?): void {
  const [customPort] = args;
  const port = parseInt(customPort, 10) || DEFAULT_PORT;
  app.listen(port, () => logger.info(`API server start on port ${port}`)).on(`error`, (err) => logger.error(`Server can't start. Error: ${err}`));
}
