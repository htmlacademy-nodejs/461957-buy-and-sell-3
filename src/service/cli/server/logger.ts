import pino from "pino";
import P from "pino";

export const logger: P.Logger = pino({
  name: `logger`,
  level: process.env.LOG_LEVEL ?? `info`,
});

export function getLogger(options: P.Bindings = {}): P.Logger {
  return logger.child(options);
}
