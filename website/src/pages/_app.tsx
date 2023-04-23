import Head from 'next/head';
import {AppProps} from 'next/app';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {CacheProvider, EmotionCache} from '@emotion/react';
import Header from '@/views/Header';

import '@fontsource/roboto/latin-300.css';
import '@fontsource/roboto/latin-400.css';
import '@fontsource/roboto/latin-500.css';
import '@fontsource/roboto/latin-700.css';
import '@fontsource/nunito/latin-800.css';
import theme from '@/theme';
import DocsLayout from '@/views/DocsLayout';
import createEmotionCache from '../createEmotionCache';

const clientSideEmotionCache = createEmotionCache();

interface CustomAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const App: FC<CustomAppProps> = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
  router,
}) => (
  <CacheProvider value={emotionCache}>
    <Head>
      <meta content='initial-scale=1, width=device-width' name='viewport' />
      <link href='/favicon.png' rel='shortcut icon' type='image/png' />
    </Head>
    {router.pathname === '/_error' ? (
      <Component {...pageProps} />
    ) : (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        {router.pathname.startsWith('/docs') ? (
          <DocsLayout>
            <Component {...pageProps} />
          </DocsLayout>
        ) : (
          <Component {...pageProps} />
        )}
      </ThemeProvider>
    )}
  </CacheProvider>
);

export default App;
