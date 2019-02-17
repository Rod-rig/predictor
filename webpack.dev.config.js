const config = require("./webpack.common.config");

module.exports = Object.assign({}, config, {
  mode: "development",
  devtool: "source-map",
});
