const Prediction = require("../models/prediction");
const User = require("../models/user");
const { createQuery } = require("../helpers/create-query-from-req");
const axios = require("axios");

exports.getAllPredictions = (req, res) => {
  Prediction.find()
    .then(prediction => {
      res.status(200).send(prediction);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

exports.getPredictionsByUserId = (req, res) => {
  const { userId } = req.session;
  Prediction.find({ "users.userId": userId })
    .then(predictions => {
      const pred = predictions
        .map(p => {
          const userPrediction = p.users.find(
            u => u.userId.toString() === userId,
          );
          return {
            awayScore: userPrediction.awayScore,
            awayTeam: p.awayTeam,
            homeScore: userPrediction.homeScore,
            homeTeam: p.homeTeam,
            status: userPrediction.status,
            id: p.matchId,
            season: p.season,
          };
        })
        .reverse();
      res.status(200).send(pred);
    })
    .catch(err => {
      res.status(404).send(err);
    });
};

module.exports.getAvailableEvents = (req, res) => {
  const { BASE_URL } = process.env;

  const getSchedule = () => {
    const { date } = req.params;
    const url = `${BASE_URL}/api/schedule/${date}`;
    return axios.get(url);
  };

  const getUser = () => {
    const { userId } = req.session;
    const url = `${BASE_URL}/users/${userId}`;
    return axios.get(url);
  };

  axios
    .all([getSchedule(), getUser()])
    .then(
      axios.spread(({ data: schedule }, { data: user }) => {
        const userPredictionIds = user.predictions.map(prediction => {
          return prediction.matchId;
        });
        const availableEvents = schedule.sport_events.filter(event => {
          return (
            userPredictionIds.indexOf(event.id) === -1 &&
            event.status === "not_started"
          );
        });
        res.status(200).send(availableEvents);
      }),
    )
    .catch(err => {
      res.status(404).send(err.data);
    });
};

exports.create = (req, res) => {
  const { payload } = req.body;
  const { userId } = req.session;
  const query = createQuery(payload, "matchId");
  let predictionIds = [];
  Prediction.find({ $or: query })
    .then(findedPrediction => {
      payload.forEach(prediction => {
        const userPrediction = {
          awayScore: prediction.awayScore,
          homeScore: prediction.homeScore,
          userId,
        };
        const existedPrediction = findedPrediction.find(
          item => item.matchId === prediction.matchId,
        );
        if (existedPrediction) {
          existedPrediction.users.push(userPrediction);
          existedPrediction.save();
          predictionIds.push(existedPrediction._id);
        } else {
          const newPrediction = new Prediction({
            awayTeam: prediction.awayTeam,
            homeTeam: prediction.homeTeam,
            matchId: prediction.matchId,
            scheduled: prediction.scheduled,
            season: prediction.season,
            seasonId: prediction.seasonId,
            tournamentId: prediction.tournamentId,
            users: [userPrediction],
          });
          newPrediction.save();
          predictionIds.push(newPrediction._id);
        }
      });
    })
    .then(() => {
      return User.findById(userId);
    })
    .then(user => {
      user.predictions.push(...predictionIds);
      return user.save();
    })
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

exports.update = (req, res) => {
  const { payload, userId } = req.body;
  const query = createQuery(payload, "matchId");
  Prediction.find({
    $or: query,
  })
    .then(predictions => {
      predictions.forEach((prediction, index) => {
        const userPrediction = prediction.users.find(
          item => item.userId.toString() === userId,
        );
        userPrediction.awayScore = payload[index].awayScore;
        userPrediction.homeScore = payload[index].homeScore;
        prediction.save();
      });
      res.sendStatus(204);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  Prediction.findById(id)
    .then(prediction => {
      const index =
        prediction &&
        prediction.users.findIndex(user => user.userId.toString() === userId);
      if (index > -1) {
        prediction.users.splice(index, 1);
        return prediction.save();
      }
      throw new Error();
    })
    .then(() => {
      return User.findById(userId);
    })
    .then(user => {
      const index =
        user && user.predictions.findIndex(item => item.toString() === id);
      if (index > -1) {
        user.predictions.splice(index, 1);
        return user.save();
      }
      throw new Error();
    })
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};
