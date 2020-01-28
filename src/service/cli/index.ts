const version = require(`./version`);
const generate = require(`./generate`);
const help = require(`./help`);

const Cli = {
  [generate.name]: generate,
  [help.name]: help,
  [version.name]: version,
};

export = Cli;
