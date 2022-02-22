const express = require("express");
const { getLogin, registerUser } = require("../controllers/usersControllers");

const router = express.Router();

router.post("/login", getLogin);
router.post("/register", registerUser);

module.exports = router;
