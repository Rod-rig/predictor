const mongoose = require('mongoose');

const PredictionSchema = new mongoose.Schema({
  id: String,
  awayScore: Number,
  awayTeam: String,
  homeScore: Number,
  homeTeam: String,
});

const Prediction = mongoose.model('Prediction', PredictionSchema);

module.exports = Prediction;