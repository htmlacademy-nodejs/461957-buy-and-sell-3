const Cli = require(`./cli`);
const {DEFAULT_COMMAND, USER_ARGV_INDEX, ExitCode} = require(`../constants`);
const chalk = require(`chalk`);

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [userCommand] = userArguments;

if (userArguments.length === 0) {
  Cli[DEFAULT_COMMAND].run();
  process.exit(ExitCode.success);
} else if (!Cli[userCommand]) {
  console.log(chalk.red(`Unknown command: ${userCommand}`));
  Cli[DEFAULT_COMMAND].run();
  process.exit(ExitCode.success);
}

Cli[userCommand].run(userArguments.slice(1));
