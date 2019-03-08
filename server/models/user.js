const mongoose = require("mongoose");
const validator = require("validator");
const msg = require("../messages");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, msg.emailValidationErr],
    required: msg.emailRequired,
  },
  name: {
    type: String,
    required: msg.nameRequired,
    trim: true,
  },
  password: String,
  predictions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Prediction",
    },
  ],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
