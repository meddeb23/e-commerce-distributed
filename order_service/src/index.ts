import config from "./config";
import fs from "fs";
import path from "path";
import axios from "axios";
import express, { Request, Response } from "express";

import Debug from "debug";
import morgan from "morgan";

import sequelize from "./database";
import { logger } from "./helper";
import { ordersRoute } from "./orders";

const debug = Debug("app:startup");

const app = express();

app.use(express.json());

app.use(
  morgan(
    ":remote-addr :method :url :status :res[content-length] - :response-time ms",
    {
      stream: {
        write: (message) => logger.http(message),
      },
    }
  )
);

(async function () {
  await sequelize.sync({ force: false });
})().then(() => logger.info("Database connection established "));

app.use("/", ordersRoute);

const PORT: Number = config.PORT;

app.listen(PORT, () => {
  const EndpointConfig = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "config", "ServiceMetadata.json"),
      "utf-8"
    )
  );
  const register_url = process.env.SERVICE_DISCOVERY_URL;

  const serviceRegister = () =>
    axios
      .post(`${register_url}/register`, {
        ...EndpointConfig,
        port: PORT,
        url: process.env.HOST,
      })
      .catch((err: any) => {
        debug("ERROR API registration");
        // console.log(err.response);
      });

  serviceRegister();
  setInterval(() => {
    serviceRegister();
  }, 5 * 1000);
  logger.info(`server is running on ${config.NODE_ENV} mode on PORT ${PORT}`);
});
