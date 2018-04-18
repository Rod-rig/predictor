const path = require('path');
const atimport = require('postcss-import');
const cssnext = require('postcss-cssnext');
const csso = require('postcss-csso');
const stylelint = require('stylelint');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './public/src/index.tsx',
  output: {
    path: path.resolve(__dirname, './public/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '../fonts/[name].[ext]'
          }
        },
      },
      {
        test: /\.png$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '../img/[name].[ext]'
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                stylelint(),
                atimport(),
                cssnext(),
                csso()
              ],
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    modules: ['node_modules', 'img']
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'bundle.css'
    })
  ]
};