const DEFAULT_COMMAND = `--help`;
const USER_ARGV_INDEX = 2;
const ExitCode = {
  error: 1,
  success: 0,
};
const DEFAULT_PORT = 3000;
const SSR_PORT = 8080;
const HttpCodes = {
  OK: 200,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
const ContentType = {
  PLAIN: `text/plain; charset=UTF-8`,
  HTML: `text/html; charset=utf-8`,
  CSS: `text/css; charset=utf-8`,
};

export = {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  ExitCode,
  DEFAULT_PORT,
  ContentType,
  HttpCodes,
  SSR_PORT,
};

