const Prediction = require("../models/prediction");
const axios = require("axios");

const today = new Date();
const yesterday = new Date(today.setDate(today.getDate() - 1))
  .toISOString()
  .split("T")[0];

exports.updateStatuses = () => {
  const { BASE_URL, PORT } = process.env;
  axios
    .get(`${BASE_URL}:${PORT}/api/daily-results/${yesterday}`)
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
            prediction.users.forEach(item => {
              const { matchId } = prediction;
              const eventResults = results.find(res => {
                return res.sport_event.id === matchId;
              }).sport_event_status;

              const isEventEnded = eventResults.status === "closed";
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
            prediction.save();
            console.log(`predictions for ${prediction.matchId} were saved!`);
          });
          console.log("Update status cron ended");
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
};
