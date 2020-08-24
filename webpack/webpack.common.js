const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/js/main.js',
    module: {
        rules: [{
                test: /\.scss$/,
                use: [{
                        loader: 'file-loader',
                        options: {
                            name: 'style-[contentHash].css',
                        },
                    },
                    'extract-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            webpackImporter: false,
                            sassOptions: {
                                includePaths: ['./node_modules']
                            },
                        }
                    }
                ]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [{
                    loader: 'file-loader',
                }, ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader',
                ],
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin.CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
};