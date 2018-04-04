const path = require('path');
const atimport = require('postcss-import');
const cssnext = require('postcss-cssnext');
const csso = require('postcss-csso');
const stylelint = require('stylelint');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './public/src/index.tsx',
  output: {
    path: path.resolve(__dirname, './public/dist/js'),
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
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
        })
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    modules: ['node_modules', 'img']
  },
  // resolve: {
  //   modules: ['node_modules'],
  //   extensions: ['.tsx', '.ts', '.js'],
  //   descriptionFiles: ['package.json'],
  //   alias: {
  //     '_config': resolve(__dirname, 'src', 'config.ts'),
  //     '_controller': resolve(__dirname, 'src', 'controllers'),
  //     '_utils': resolve(__dirname, 'src', 'utils'),
  //   },
  // },
  plugins: [
    new ExtractTextPlugin('../css/bundle.css')
  ]
};