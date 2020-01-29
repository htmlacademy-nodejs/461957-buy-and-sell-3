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
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Привет!</h1>
    <p>Ты используешь: ${userAgent}.</p>
  </body>
</html>`
}

const styles = `
h1 {
  color: red;
  font-size: 24px;
}

p {
  color: green;
  font-size: 16px;
}`;

function onClientConnect(req, res) {

  switch (req.url) {
    case `/style.css`:
      res.writeHead(HTTP_CODES.OK, {
        'content-type': CONTENT_TYPE.css,
      });
      res.end(styles);
      break;
    case '/':
      const userAgent = req.headers[`user-agent`];
      res.writeHead(HTTP_CODES.OK, {
        'content-type': CONTENT_TYPE.html,
      });
      res.end(getResponseMarkup(userAgent));
      break;
    default:
      res.writeHead(HTTP_CODES.notFound, {
        'content-type': CONTENT_TYPE.plain,
      });
      res.end(`404: Not found`);
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
