import {CliAction} from "../../types/cli-action";
import { Offer } from '../../types/offer';
const chalk = require(`chalk`);
const http = require(`http`);
const fs = require(`fs`).promises;
const {DEFAULT_PORT, HttpCodes, ContentType} = require(`../../constants`);

const notFoundMessageText = `404: Not Found`;
const MOCK_FILE_PATH = `./mocks.json`;

function sendResponse(res, statusCode: number, content: string): void {
  const template = `
  <!Doctype html>
      <html lang="ru">
      <head>
        <title>With love from Node</title>
      </head>
      <body>${content}</body>
    </html>`.trim();
  res.statusCode = statusCode;
  res.writeHead(statusCode, {
    'content-type': ContentType.HTML,
  });

  res.end(template);
}

async function onClientConnect(req, res) {
  switch (req.url) {
    case '/':
      try {
        const rawMocks = await fs.readFile(MOCK_FILE_PATH, `utf8`);
        const titles = (JSON.parse(rawMocks) as Offer[])
          .map(offer => `<li>${offer.title}</li>`)
          .join(``);
        sendResponse(res, HttpCodes.OK, `<ul>${titles}</ul>`)
      } catch (e) {
        sendResponse(res, HttpCodes.NOT_FOUND, notFoundMessageText);
      }
      break;
    default:
      sendResponse(res, HttpCodes.NOT_FOUND, notFoundMessageText);
  }
}

const cliAction: CliAction = {
  name: `--server`,
  run(args?) {
    const [customPort] = args;
    const port = parseInt(customPort, 10) || DEFAULT_PORT;
    const httpServer = http.createServer(onClientConnect);
    httpServer.listen(port, (e) => {
      if (e) {
        return console.error(chalk.red(`Error on create http-server.`, e));
      }
      return console.info(chalk.green(`Listen on port ${port}`))
    });
  }
};

export = cliAction;
