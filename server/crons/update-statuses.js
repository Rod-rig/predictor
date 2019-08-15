const Prediction = require("../models/prediction");
const axios = require("axios");

const today = new Date();
const yesterday = new Date(today.setDate(today.getDate() - 1))
  .toISOString()
  .split("T")[0];

exports.updateStatuses = () => {
  const { BASE_URL } = process.env;
  axios
    .get(`${BASE_URL}/api/daily-results/${yesterday}`)
    .then(({ data }) => data)
    .then(({ results }) => {
      const query = results.map(res => {
        return {
          matchId: res.sport_event.id,
        };
      });

      Prediction.find({ $or: query })
        .then(predictions => {
          predictions.forEach(prediction => {
            const { matchId } = prediction;
            const eventResults = results.find(res => {
              return res.sport_event.id === matchId;
            }).sport_event_status;
            //todo here can be a bug with postponed status event
            const isEventEnded = eventResults.status === "closed";

            prediction.users.forEach(item => {
              const isPredictionCorrect =
                eventResults.home_score === item.homeScore &&
                eventResults.away_score === item.awayScore;
              if (isPredictionCorrect && isEventEnded) {
                item.status = 1;
              }
              if (!isPredictionCorrect && isEventEnded) {
                item.status = 0;
              }
            });
            if (isEventEnded) {
              prediction.matchResult.homeScore = eventResults.home_score;
              prediction.matchResult.awayScore = eventResults.away_score;
            }
            prediction.save();
            console.log(`predictions for ${prediction.matchId} were saved!`);
          });
          console.log("Update status cron finished successfully");
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
};
