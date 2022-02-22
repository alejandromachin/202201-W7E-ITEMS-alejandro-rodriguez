require("dotenv").config();
const express = require("express");
const debug = require("debug")("things:server");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));

const serverUp = async (port) => {
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(`Server up in http://localhost:${port}`);
      resolve();
    });
    server.on("error", (error) => {
      const message =
        error.code === "EADDRINUSE" ? `Port ${port} busy` : error.message;
      reject(new Error(`Error on server: ${message}`));
    });
  });
};

module.exports = serverUp;
