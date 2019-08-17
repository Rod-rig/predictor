const Prediction = require("../models/prediction");
const axios = require("axios");
const { green, red } = require("chalk");

const today = new Date();
const yesterday = new Date(today.setDate(today.getDate() - 1))
  .toISOString()
  .split("T")[0];

const createQuery = results =>
  results.map(res => {
    return {
      matchId: res.sport_event.id,
    };
  });

const updateUsersStatuses = (users, results, isEventEnded) => {
  users.forEach(u => {
    const isPredictionCorrect =
      results.home_score === u.homeScore && results.away_score === u.awayScore;
    if (isPredictionCorrect && isEventEnded) {
      u.status = 1;
    }
    if (!isPredictionCorrect && isEventEnded) {
      u.status = 0;
    }
  });
};

const setMatchResult = (prediction, results, isEventEnded) => {
  if (isEventEnded) {
    prediction.matchResult.homeScore = results.home_score;
    prediction.matchResult.awayScore = results.away_score;
  }
};

exports.updateStatuses = async () => {
  const { BASE_URL } = process.env;

  try {
    const { data } = await axios.get(
      `${BASE_URL}/api/daily-results/${yesterday}`,
    );
    const { results } = data;

    const query = createQuery(results);

    const predictions = await Prediction.find({ $or: query });
    predictions.forEach(p => {
      const { matchId } = p;
      const eventResults = results.find(res => {
        return res.sport_event.id === matchId;
      }).sport_event_status;
      //todo here can be a bug with postponed status event
      const isEventEnded = eventResults.status === "closed";

      updateUsersStatuses(p.users, eventResults, isEventEnded);
      setMatchResult(p, eventResults, isEventEnded);
      p.save();
      console.log(`prediction for ${p.matchId} was saved`);
    });
    console.log(green("Update status cron finished successfully"));
  } catch (err) {
    console.log(red("Error while updating statuses", err));
  }
};
