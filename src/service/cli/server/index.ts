import {Express} from "express";

const express = require(`express`);
const apiRouter = require(`./routes/api`);
const chalk = require(`chalk`);
const {DEFAULT_PORT} = require(`../../../constants`);

function runServer(args?) {
  const [customPort] = args;
  const port = parseInt(customPort, 10) || DEFAULT_PORT;
  const app: Express = express();

  app.use(`/api`, apiRouter);

  app.listen(port, () => console.info(chalk.green(`Listen on port ${port}`)));
}

export = runServer;
