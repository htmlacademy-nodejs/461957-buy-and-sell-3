const version = require(`./version`);
const generate = require(`./generate`);

const Cli = {
  [generate.name]: generate,
  [version.name]: version,
};

export = Cli;
