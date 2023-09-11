import solid from 'solid-start/vite';
import {defineConfig} from 'vite';
import staticAdapter from 'solid-start-static';
import Icons from 'unplugin-icons/vite';

export default defineConfig({
  plugins: [
    {
      ...(await import('@mdx-js/rollup')).default({
        jsx: true,
        jsxImportSource: 'solid-js',
        providerImportSource: 'solid-mdx',
      }),
      enforce: 'pre',
    },
    solid({
      adapter: staticAdapter(),
      extensions: ['.mdx', '.md'],
    }),
    Icons({
      compiler: 'solid',
      autoInstall: true,
    }),
  ],
});
