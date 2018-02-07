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
        filename: 'bundle.min.js'
    },
    devtool: 'source-map',
    devServer: {
        hot: true,
        open: true,
        contentBase: './public'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
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
    plugins: [
        new ExtractTextPlugin('../css/bundle.min.css')
    ]
};