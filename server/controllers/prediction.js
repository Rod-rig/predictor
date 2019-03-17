const Prediction = require("../models/prediction");
const User = require("../models/user");
const { createQuery } = require("../helpers/createQueryFromReq");

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
  const { userId } = req.params;
  Prediction.find({ "users.userId": userId })
    .then(predictions => {
      res.status(200).send(predictions);
    })
    .catch(err => {
      res.status(404).send(err);
    });
};

exports.create = (req, res) => {
  const { payload, userId } = req.body;
  const query = createQuery(payload, "matchId");
  let predictionIds = [];
  Prediction.find({ $or: query })
    .then(findedPrediction => {
      payload.forEach(prediction => {
        const {
          matchId,
          awayScore,
          awayTeam,
          homeScore,
          homeTeam,
          scheduled,
          seasonId,
          tournamentId,
        } = prediction;
        const userPrediction = {
          userId,
          awayScore,
          homeScore,
        };
        const existedPrediction = findedPrediction.find(
          item => item.matchId === matchId,
        );
        if (existedPrediction) {
          existedPrediction.users.push(userPrediction);
          existedPrediction.save();
          predictionIds.push(existedPrediction._id);
        } else {
          const newPrediction = new Prediction({
            matchId,
            scheduled,
            seasonId,
            tournamentId,
            awayTeam,
            homeTeam,
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
