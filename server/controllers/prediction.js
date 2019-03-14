const Prediction = require("../models/prediction");
const User = require("../models/user");

exports.all = (req, res) => {
  Prediction.find()
    .then(prediction => {
      res.status(200).send(prediction);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

exports.getByUserId = (req, res) => {
  Prediction.find({ userId: req.params.userId })
    .then(prediction => {
      res.status(200).send(prediction);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

// module.exports.getAvailablePredictions = (req, res) => {
//   axios
//     .get(
//       `${process.env.BASE_URL}:${process.env.PORT}/api/schedule/${
//         req.params.date
//         }`,
//     )
//     .then(response => {
//       User.findOne({ name: req.session.name }, (err, user) => {
//         if (err) return res.status(500).send("Cannot get all predictions");
//         const sportEvents = response.data["sport_events"];
//         const ids = user.predictions.map(prediction => {
//           return prediction.id;
//         });
//         const availablePredictions = sportEvents.filter(match => {
//           return ids.indexOf(match.id) === -1;
//         });
//         res.status(200).send(availablePredictions);
//       });
//     })
//     .catch(err => {
//       res.status(500).send(err);
//     });
// };

const collectQuery = (body, field) => {
  return body.map(item => ({
    [field]: item[field],
  }));
};

exports.create = (req, res) => {
  const { payload, userId } = req.body;
  const query = collectQuery(payload, "matchId");
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
  const query = collectQuery(payload, "matchId");
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
      res.status(200).send(predictions);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

exports.delete = (req, res) => {
  Prediction.findByIdAndDelete(req.params.matchId)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};
