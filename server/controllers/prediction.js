const Prediction = require("../models/prediction");
const User = require("../models/user");

exports.all = (req, res) => {
  Prediction.find()
    .then(predictions => {
      res.status(200).send(predictions);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

exports.getByUserId = (req, res) => {
  Prediction.find({ userId: req.params.userId })
    .then(predictions => {
      res.status(200).send(predictions);
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

exports.create = (req, res) => {
  const {
    matchId,
    awayScore,
    awayTeam,
    homeScore,
    homeTeam,
    scheduled,
    seasonId,
    tournamentId,
    userId,
  } = req.body;
  let predictionId;
  Prediction.findOne({ matchId })
    .then(prediction => {
      const userPredictionBody = {
        userId,
        awayScore,
        awayTeam,
        homeScore,
        homeTeam,
      };
      if (prediction) {
        prediction.users.push(userPredictionBody);
        prediction.save();
        predictionId = prediction._id;
      } else {
        const newPrediction = new Prediction({
          matchId,
          scheduled,
          seasonId,
          tournamentId,
          users: [userPredictionBody],
        });
        newPrediction.save();
        predictionId = newPrediction._id;
      }
    })
    .then(() => {
      return User.findById(req.body.userId);
    })
    .then(user => {
      user.predictions.push(predictionId);
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
  const { homeScore, awayScore } = req.body;
  Prediction.findOneAndUpdate(
    { matchId: req.params.matchId },
    {
      homeScore,
      awayScore,
    },
  )
    .then(() => {
      res.sendStatus(204);
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
