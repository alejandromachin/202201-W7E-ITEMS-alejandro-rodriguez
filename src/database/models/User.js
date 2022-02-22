const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: Number,
    required: true,
  },
});

const User = model("User", userSchema, "users");

module.exports = User;