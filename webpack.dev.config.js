const config = require("./webpack.common.config");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

module.exports = Object.assign({}, config, {
  mode: "development",
  devtool: "eval",
  plugins: [
    new BrowserSyncPlugin({
      proxy: "localhost:8080",
    }),
  ],
});
