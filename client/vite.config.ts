import {resolve} from 'node:path';

import {defineConfig, type PluginOption} from 'vite';
import solidPlugin from 'vite-plugin-solid';
import {visualizer} from 'rollup-plugin-visualizer';
import pkg from './package.json';

const platform =
  (process.env.platform as 'web' | 'chrome' | 'firefox') ?? 'web';

export default defineConfig({
  plugins: [
    solidPlugin(),
    visualizer({
      filename: 'dist/stats.html',
    }) as PluginOption,
  ],
  server: {
    port: 3000,
  },
  build: {
    outDir: `dist/${platform}`,
    target: 'esnext',
  },
  resolve: {
    alias: {
      '~': resolve('./src'),
    },
  },
  define: {
    global: 'window',
    VERSION: JSON.stringify(pkg.version),
    PLATFORM: JSON.stringify(platform.toUpperCase()),
  },
});
