const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../database/models/User");
const encryptPassword = require("../utils/encryptPassword");

const getLogin = async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    const error = new Error("Sorry, you are not invited to the party");
    error.code = 404;
    next(error);
  } else {
    const userData = {
      username: user.name,
      id: user.id,
    };
    const rightPassword = await bcrypt.compare(password, user.password);
    if (!rightPassword) {
      const error = new Error("Sorry, you are not who you say you are");
      error.code = 403;
      next(error);
    } else {
      const token = jsonwebtoken.sign(userData, process.env.SECRET);
      res.json({ token });
    }
  }
};

const registerUser = async (req, res, next) => {
  const user = req.body;
  const { username, password } = user;

  const existingUser = await User.findOne({ username });

  if (!existingUser) {
    const encryptedPassword = await encryptPassword(password);
    user.password = encryptedPassword;
    const createdUser = await User.create(user);
    res.json(createdUser);
  } else {
    const error = new Error("Sorry, username alredy taken");
    error.code = 409;
    next(error);
  }
};

module.exports = { getLogin, registerUser };
