const config = require("./webpack.common.config");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

module.exports = Object.assign({}, config, {
  mode: "development",
  devtool: "source-map",
  plugins: [
    new BrowserSyncPlugin({
      host: "localhost",
      port: 8080,
      proxy: "http://localhost:8080/",
    }),
  ],
});
