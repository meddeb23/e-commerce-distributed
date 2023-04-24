const express = require("express");
require("dotenv").config();
const fs = require('fs')
const path = require('path')
const axios = require("axios")
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
var products = require("./routes/product.route");
var categories = require("./routes/category.route");
var discounts = require("./routes/discount.route");
var db = require("./models");
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.status(200).send("hey api  📚📚📚📚📚 ");
});
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
db.sequelize.sync({ alter: true }).then(() => {
  console.log("Drop and re-sync db.");
});
app.use("/api/produit", products);
app.use("/api/categories", categories);
app.use("/api/discounts", discounts);
const PORT = process.env.PORT || 3000;

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
      .catch((err) => {
        console.log("ERROR API registration");
        // console.log(err.response);
      });

  serviceRegister();
  setInterval(() => {
    serviceRegister();
  }, 5 * 1000);
  console.log("app run on port ", PORT);
});
