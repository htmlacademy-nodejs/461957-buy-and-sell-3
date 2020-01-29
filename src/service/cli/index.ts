const version = require(`./version`);
const generate = require(`./generate`);
const help = require(`./help`);
const server = require(`./server`);

const Cli = {
  [generate.name]: generate,
  [help.name]: help,
  [version.name]: version,
  [server.name]: server,
};

export = Cli;
