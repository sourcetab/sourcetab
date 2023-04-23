import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import process from 'node:process';

import react from '@vitejs/plugin-react-swc';
import {visualizer} from 'rollup-plugin-visualizer';
import Compression from 'unplugin-compression/vite';
import {WebExtPlugin} from 'unplugin-web-ext/vite';
import {defineConfig, type PluginOption} from 'vite';

const pkg = JSON.parse(readFileSync('../package.json', {encoding: 'utf8'}));

const platform = process.env.platform as 'web' | 'chrome' | 'firefox';

export default defineConfig({
  build: {
    outDir: `dist/${platform}`,
  },
  resolve: {
    alias: {
      '@': resolve('./src'),
    },
  },
  define: {
    global: 'window',
    VERSION: JSON.stringify(pkg.version),
    PLATFORM: JSON.stringify(platform.toUpperCase()),
  },
  plugins: [
    react(),
    ...(platform === 'web'
      ? []
      : [
          WebExtPlugin({
            manifest: [
              './assets/manifest.json',
              {
                version: pkg.version,
                manifest_version: platform === 'firefox' ? 2 : 3,
              },
              platform === 'firefox' ? './assets/manifest-firefox.json' : {},
            ],
          }),
          Compression({
            adapter: 'zip',
            source: `dist/${platform}`,
            outDir: 'dist',
            formatter: `${platform}.${platform === 'firefox' ? 'xpi' : 'zip'}`,
          }),
        ]),
    visualizer({
      filename: 'dist/stats.html',
    }) as PluginOption,
  ],
});