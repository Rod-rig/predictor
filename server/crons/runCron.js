const { updateStatuses } = require("./updateStatuses");
const { updateUsersStats } = require("./updateUsersStats");

exports.runCron = async () => {
  await updateStatuses();
  await updateUsersStats();
};
