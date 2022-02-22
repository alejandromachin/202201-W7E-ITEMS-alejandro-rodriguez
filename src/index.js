const serverUp = require("./server");

require("dotenv").config();

const port = process.env.PORT || 4500;

(async () => {
  await serverUp(port);
})();
