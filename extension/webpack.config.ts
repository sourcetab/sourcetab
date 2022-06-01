import {resolve} from 'path';
import {getLuminance} from '@mui/material';
import timezones from '@vvo/tzdb/time-zones-names.json';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import condSpread from 'cond-spread';
import CopyPlugin from 'copy-webpack-plugin';
import simpleIcons from 'simple-icons';
import TerserPlugin from 'terser-webpack-plugin';
import {WebExtPlugin} from 'unplugin-web-ext/webpack';
import webpack from 'webpack';
import ZipPlugin from 'zip-webpack-plugin';

import pkg from '../package.json';

const str = JSON.stringify;

const timezoneRecord: Record<string, string[]> = {};

for (const timezone of timezones) {
  const [region, location] = timezone.split('/');
  if (!Object.prototype.hasOwnProperty.call(timezoneRecord, region)) {
    timezoneRecord[region] = [];
  }

  timezoneRecord[region].push(location);
}

const config = async (
  {
    platform,
  }: {
    platform: 'web' | 'chrome' | 'firefox';
  },
  {mode}: {mode: 'production' | 'development'},
): Promise<webpack.Configuration> => {
  const isDev = condSpread(mode === 'development');
  const isProd = condSpread(mode === 'production');
  const isExt = condSpread(platform !== 'web');
  const isWeb = condSpread(platform === 'web');

  return {
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
      alias: {
        '@': resolve('./src'),
      },
    },
    entry: './src',
    output: {
      filename: 'js/index.js',
      path: resolve(`./dist/${platform}`),
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'swc-loader',
            },
          ],
        },
        {
          test: /\.(png|jpe?g|svg|)$/,
          loader: 'file-loader',
        },
      ],
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          extractComments: () => false,
        }),
      ],
    },
    plugins: [
      ...isProd([
        new CleanWebpackPlugin(),
        new CopyPlugin({
          patterns: [
            {
              from: './assets/index.html',
              to: 'index.html',
            },
            {
              from: './assets/beach.jpg',
              to: 'beach.jpg',
            },
          ],
        }),
      ]),
      new webpack.DefinePlugin({
        SIMPLEICONSCONFIG: (() => {
          const out: Record<string, [string, string, string]> = {};

          for (const icon of Object.keys(simpleIcons)) {
            out[icon] = [
              str(simpleIcons[icon].title),
              str(simpleIcons[icon].hex),
              str(getLuminance(`#${simpleIcons[icon].hex}`) < 0.4),
            ];
          }

          return out;
        })(),
        WEBLAUNCHERVERSION: str(pkg.version),
        TIMEZONEOBJECT: str(timezoneRecord),
        PLATFORM: str(platform.toUpperCase()),
      }),
      (compiler: webpack.Compiler) => {
        compiler.hooks.thisCompilation.tap('simpleicons', (compilation) => {
          compilation.hooks.processAssets.tap(
            {
              name: 'simpleicons',
              stage:
                compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
            },
            () => {
              for (const icon of Object.keys(simpleIcons)) {
                compilation.emitAsset(
                  `simpleicons/${icon}`,
                  new webpack.sources.RawSource(simpleIcons[icon].path),
                );
              }
            },
          );

          return true;
        });
      },
      ...isExt([
        new CopyPlugin({
          patterns: [
            {
              from: './assets/icons',
              to: './icons',
            },
          ],
        }),
        // eslint-disable-next-line new-cap
        WebExtPlugin({
          manifest: ['./assets/manifest.json', {version: pkg.version}],
        }),
        ...isProd([
          new ZipPlugin({
            path: '../',
            filename: platform,
            extension: {chrome: 'zip', firefox: 'xpi', web: undefined}[
              platform
            ],
          }),
        ]),
      ]),
      ...isWeb([
        new CopyPlugin({
          patterns: [
            {
              from: './assets/icons/16.png',
              to: './icons/16.png',
            },
          ],
        }),
      ]),
    ] as webpack.WebpackPluginInstance[],
    ...isDev({
      devServer: {
        open: true,
        hot: true,
        static: {
          directory: resolve('assets'),
        },
      },
      devtool: 'eval-cheap-module-source-map',
    }),
  };
};

export default config;
