import pino from "pino";
import P from "pino";
import {ENV} from "../../../shared/env";

export const logger: P.Logger = pino({
  name: `logger`,
  level: process.env[ENV.LOG_LEVEL] ?? `info`,
});

export function getLogger(options: P.Bindings = {}): P.Logger {
  return logger.child(options);
}
