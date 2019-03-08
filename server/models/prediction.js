const mongoose = require("mongoose");

const PredictionSchema = new mongoose.Schema({
  matchId: {
    type: String,
    required: true,
  },
  scheduled: {
    type: String,
    required: true,
  },
  seasonId: {
    type: String,
    required: true,
  },
  tournamentId: {
    type: String,
    required: true,
  },
  users: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      awayScore: {
        type: Number,
        required: true,
      },
      awayTeam: {
        type: String,
        required: true,
      },
      homeScore: {
        type: Number,
        required: true,
      },
      homeTeam: {
        type: String,
        required: true,
      },
      created: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Prediction = mongoose.model("Prediction", PredictionSchema);

module.exports = Prediction;
