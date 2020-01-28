import {IPackageJson} from "package-json-type";
import {CliAction} from "../../types/cli-action";

const packageJsonFile = require(`../../../package.json`);
const version: string = (packageJsonFile as IPackageJson).version;

const cliAction: CliAction = {
  name: `--version`,
  run() {
    console.info(version);
  },
};

export = cliAction;
