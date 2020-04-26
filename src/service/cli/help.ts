import {CliAction} from "../../types/cli-action";
const chalk = require(`chalk`);

const cliAction: CliAction = {
  name: `--help`,
  run() {
    console.info(
      chalk.gray(`Программа запускает http-сервер и формирует файл с данными для API.
    Гайд:
    server \<command\>;
    Команды:
    --version:            выводит номер версии
    --help:               печатает этот текст
    --server:             запускает сервер
    --generate &lt;count&gt;    формирует файл mocks.json`),
    );
  },
};

export = cliAction;
