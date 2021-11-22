const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const WebpackExtensionManifestPlugin = require('webpack-extension-manifest-plugin');
const pkg = require('./package.json');
const chromeManifest = require('./assets/manifest.json');

module.exports = env => {
  let mode = 'production';
  let platform = 'web';
  let isExtension = false;

  switch (env.mode) {
    case 'prod':
      break;
    case 'dev':
      mode = 'development';
      break;
    default:
      return undefined;
  }

  switch (env.platform) {
    case 'chrome':
      platform = 'chrome';
      isExtension = true;
      break;
    case 'firefox':
      platform = 'firefox';
      isExtension = true;
      break;
    case 'web':
      break;
    default:
      return undefined;
  }

  return {
    mode,
    output: {
      filename: '[name]-[contenthash].js',
      path: path.resolve(__dirname, `./dist/${platform}`),
    },
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
          loader: 'file-loader',
          options: {
            limit: 100000,
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          loader: 'file-loader',
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
      new CopyPlugin({
        patterns: [
          {
            from: './assets/beach.jpg',
            to: './beach.jpg',
          },
        ],
      }),
      ...(isExtension
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
                  version: pkg.version,
                  description: pkg.description,
                },
              },
            }),
          ]
        : []),
    ],
  };
};
