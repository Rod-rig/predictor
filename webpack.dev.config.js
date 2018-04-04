const config = require('./webpack.common.config');

module.exports = Object.assign({}, config, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    hot: true,
    open: true,
    contentBase: './public'
  }
});