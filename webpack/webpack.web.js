const common = require('./webpack.common.js');
const path = require('path');
const webpack = require('webpack');
const WebpackMerge = require('webpack-merge');

module.exports = WebpackMerge(common, {
    mode: 'production',
    output: {
        filename: '[name]-[contentHash].js',
        path: path.resolve(__dirname, '../build/web')
    },
    plugins: [
        new webpack.DefinePlugin({
            'PLATFORM': JSON.stringify('WEB')
        })
    ]
});