const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please Enter the email."],
    },
    password: {
      type: String,
      required: [true, "Please Enter the email."],
    },
    username: {
      type: String,
      required: [true, "Please Enter the username."],
    },
  },
  {
    timestamp: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
