const DEFAULT_COMMAND = `--help`;
const USER_ARGV_INDEX = 2;
const ExitCode = {
  error: 1,
  success: 0,
};
const DEFAULT_PORT = 3000;
const HTTP_CODES = {
  OK: 200,
  notFound: 404,
  internalServerError: 500,
};
const CONTENT_TYPE = {
  text: `text/plain; charset=UTF-8`,
  html: `text/html; charset=utf-8`
};

export = {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  ExitCode,
  DEFAULT_PORT,
  HTTP_CODES,
  CONTENT_TYPE,
};

