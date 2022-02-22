require("dotenv").config();
const serverUp = require("./server");

const port = process.env.PORT || 4500;

(async () => {
  await serverUp(port);
})();
