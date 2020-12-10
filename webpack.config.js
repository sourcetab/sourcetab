const CopyPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const WebpackExtensionManifestPlugin = require('webpack-extension-manifest-plugin');
const { version } = require('./package.json');
const chromeManifest = require('./assets/manifest.json');

module.exports = env => {
  let platform = 'web';
  let mode = 'production';

  switch (env) {
    case 'analyze':
      break;
    case 'chrome':
      platform = 'chrome';
      break;
    case 'dev':
      mode = 'development';
      break;
    case 'firefox':
      platform = 'firefox';
      break;
    case 'web':
      break;
    default:
      return undefined;
  }

  return {
    mode,
    output: {
      filename: '[name]-[contentHash].js',
      path: path.resolve(__dirname, `./dist/${platform}`),
    },
    entry: ['./src/js/index.js'],
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          loader: 'url-loader',
          options: {
            limit: 100000,
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          loader: 'url-loader',
          options: {
            limit: 100000,
          },
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin({
        PLATFORM: JSON.stringify(platform.toUpperCase()),
      }),
      new HtmlWebpackPlugin({
        template: './src/template.html',
        inject: 'body',
      }),
      ...(env === 'analyze' ? [new BundleAnalyzerPlugin()] : []),
      ...(env === 'chrome' || env === 'firefox'
        ? [
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
                  version,
                },
              },
            }),
          ]
        : []),
    ],
  };
};
