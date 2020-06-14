import {Express} from "express";
import apiRouter from "./routes/api";
import {DEFAULT_PORT} from "../../../shared/variables";

const express = require(`express`);
const bodyParser = require(`body-parser`);
const chalk = require(`chalk`);

export const app: Express = express();
app.use(bodyParser.json());
app.use(`/api`, apiRouter);

export function runServer(args?) {
  const [customPort] = args;
  const port = parseInt(customPort, 10) || DEFAULT_PORT;
  app.listen(port, () => console.info(chalk.green(`Listen on port ${port}`)));
}
