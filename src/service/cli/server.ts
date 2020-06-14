import {CliAction} from "../../types/cli-action";
import {runServer} from "./server/index";

const cliAction: CliAction = {
  name: `--server`,
  run: runServer,
};

export = cliAction;
