const chromeManifest = require('../assets/manifest.json');
const common = require('./webpack.common.js');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const pkg = require('../package.json');
const webpack = require('webpack');
const WebpackExtensionManifestPlugin = require('webpack-extension-manifest-plugin');
const WebpackMerge = require('webpack-merge');

module.exports = WebpackMerge(common, {
    mode: 'production',
    output: {
        filename: '[name]-[contentHash].js',
        path: path.resolve(__dirname, '../build/firefox')
    },
    plugins: [
        new CopyPlugin({
            patterns: [{
                from: './assets/icons',
                to: './icons'
            }]
        }),
        new WebpackExtensionManifestPlugin({
            config: {
                base: chromeManifest,
                extend: {
                    version: pkg.version
                }
            }
        }),
        new webpack.DefinePlugin({
            'PLATFORM': 'FIREFOX'
        })
    ]
});