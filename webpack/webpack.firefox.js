const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const WebpackExtensionManifestPlugin = require('webpack-extension-manifest-plugin');
const WebpackMerge = require('webpack-merge');
const pkg = require('../package.json');
const common = require('./webpack.common.js');
const chromeManifest = require('../assets/manifest.json');

module.exports = WebpackMerge(common, {
  mode: 'production',
  output: {
    filename: '[name]-[contentHash].js',
    path: path.resolve(__dirname, '../build/firefox'),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: './assets/icons',
          to: './icons',
        },
      ],
    }),
    new WebpackExtensionManifestPlugin({
      config: {
        base: chromeManifest,
        extend: {
          version: pkg.version,
        },
      },
    }),
    new webpack.DefinePlugin({
      PLATFORM: JSON.stringify('FIREFOX'),
    }),
  ],
});
