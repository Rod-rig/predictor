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
  stats: {
    totalPredictions: {
      type: Number,
      default: 0,
    },
    correctPredictions: {
      type: Number,
      default: 0,
    },
    pendingPredictions: {
      type: Number,
      default: 0,
    },
    successRate: {
      type: Number,
      default: 0,
    },
    oneXTwoSuccessRate: {
      type: Number,
      default: 0,
    },
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
