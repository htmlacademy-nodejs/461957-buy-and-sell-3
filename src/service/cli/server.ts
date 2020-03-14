import {CliAction} from "../../types/cli-action";
import {Offer} from "../../types/offer";

const runServer = require(`./server/index`);
const express = require(`express`);
const chalk = require(`chalk`);
const http = require(`http`);
const fs = require(`fs`).promises;
const {
  DEFAULT_PORT,
  HttpCodes,
  ContentType,
  MOCK_FILE_PATH,
} = require(`../../constants`);

const notFoundMessageText = `404: Not Found`;

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
    "content-type": ContentType.HTML,
  });

  res.end(template);
}

async function onClientConnect(req, res) {
  switch (req.url) {
    case "/":
      try {
        const rawMocks = await fs.readFile(MOCK_FILE_PATH, `utf8`);
        const titles = (JSON.parse(rawMocks) as Offer[])
          .map(offer => `<li>${offer.title}</li>`)
          .join(``);
        sendResponse(res, HttpCodes.OK, `<ul>${titles}</ul>`);
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
  run: runServer,
};

export = cliAction;
