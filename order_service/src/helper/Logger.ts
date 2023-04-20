import winston, { format } from "winston";
import sanitizedConfig from "../config";

const { combine, timestamp, metadata, printf } = format;

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  return sanitizedConfig.isDevMode ? "debug" : "warn";
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

const logFormat = format.combine(
  metadata(),
  timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  // winston.format.colorize({ all: true }),
  printf((info) => {
    return `[${info.timestamp}] [${info.level.toUpperCase()}] ${info.message} ${
      info.metadata && Object.keys(info.metadata).length
        ? "\n" + JSON.stringify(info.metadata)
        : ""
    }`;
  })
);

const logger = winston.createLogger({
  level: level(),
  levels,
  format: logFormat,
  transports: [
    new winston.transports.File({
      filename: "src/logs/error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "src/logs/http.log",
      level: "http",
    }),
    new winston.transports.File({
      filename: "src/logs/all.log",
    }),
    new winston.transports.Console(),
  ],
});

export default logger;
