const User = require("../models/user");
const Prediction = require("../models/prediction");
const { green, red } = require("chalk");

const collectUserStats = async user => {
  try {
    const predictions = await Prediction.find({
      "users.userId": user._id.toString(),
    });
    if (predictions.length < 1) {
      return user.stats;
    }
    let correctPredictions = 0;
    let oneXTwoSuccessRate = 0;
    let pendingPredictions = 0;

    for (let p of predictions) {
      const userPrediction = p.users.find(
        u => u.userId.toString() === user._id.toString(),
      );
      if (userPrediction.status === 1) {
        correctPredictions += 1;
      }
      if (
        userPrediction.status === 1 ||
        (userPrediction.homeScore > userPrediction.awayScore &&
          p.matchResult.homeScore > p.matchResult.awayScore) ||
        (userPrediction.homeScore < userPrediction.awayScore &&
          p.matchResult.homeScore < p.matchResult.awayScore) ||
        (userPrediction.homeScore === userPrediction.awayScore &&
          p.matchResult.homeScore === p.matchResult.awayScore)
      ) {
        oneXTwoSuccessRate += 1;
      }
      if (userPrediction.status === -1) {
        pendingPredictions += 1;
      }
    }

    const totalPredictions = predictions.length;
    const oldPredictions = totalPredictions - pendingPredictions;
    return {
      correctPredictions,
      oneXTwoSuccessRate:
        Math.round((oneXTwoSuccessRate / oldPredictions) * 100 * 100) / 100,
      pendingPredictions,
      successRate:
        Math.round((correctPredictions / oldPredictions) * 100 * 100) / 100,
      totalPredictions,
    };
  } catch (err) {
    console.log(red("Error while collecting user stats", err));
  }
};

exports.updateUsersStats = async () => {
  try {
    const users = await User.find();
    for (let u of users) {
      u.stats = await collectUserStats(u);
      u.save();
      console.log(`Stats for user ${u._id.toString()} were saved!`);
    }
    console.log(green("Updating of user stats cron finished successfully"));
  } catch (err) {
    console.log(red("Error while updating user stats", err));
  }
};
