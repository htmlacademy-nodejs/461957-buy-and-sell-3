import {CliAction} from "../../types/cli-action";
const chalk = require(`chalk`);
const http = require(`http`);
const fs = require(`fs`).promises;
const {DEFAULT_PORT, HTTP_CODES, CONTENT_TYPE} = require(`../../constants`);

function getResponseMarkup(userAgent: string) {
  return `
  <!Doctype html>
  <html lang="ru">
  <head>
    <title>From Node with love!</title>
  </head>
  <body>
    <h1>Привет!</h1>
    <p>Ты используешь: ${userAgent}.</p>
  </body>
</html>`
}

function onClientConnect(req, res) {
  const userAgent = req.headers[`user-agent`];
  res.writeHead(HTTP_CODES.OK, {
    'content-type': CONTENT_TYPE.html,
  });
  res.end(getResponseMarkup(userAgent));
}

const cliAction: CliAction = {
  name: `--server`,
  run() {
    const httpServer = http.createServer(onClientConnect);
    httpServer.listen(DEFAULT_PORT, (e) => {
      if (e) {
        return console.error(chalk.red(`Error on create http-server.`, e));
      }
      return console.info(chalk.green(`Listen on port ${DEFAULT_PORT}`))
    });
  }
};

export = cliAction;
