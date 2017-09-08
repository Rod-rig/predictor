const path = require('path');
const atimport = require('postcss-import');
const cssnext = require('postcss-cssnext');
const csso = require('postcss-csso');
const stylelint = require('stylelint');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './public/js/local.js',
    output: {
        path: path.resolve(__dirname, './public/js'),
        filename: 'bundle.min.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            'presets': ['es2015']
                        }
                    },
                    'eslint-loader'
                ],
                exclude: /node_modules/
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
        modules: ['node_modules', 'img']
    },
    plugins: [
        new ExtractTextPlugin('../css/bundle.min.css')
    ]
};