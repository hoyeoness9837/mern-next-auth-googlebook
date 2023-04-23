import React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../config/theme';
import createEmotionCache from '../config/createEmotionCache';
import { SessionProvider } from 'next-auth/react';
import Layout from '@/components/layout';
import '@/styles/globals.css';

const clientSideEmotionCache = createEmotionCache();

export default function MyApp({
  emotionCache = clientSideEmotionCache,
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <CacheProvider value={emotionCache}>
      <SessionProvider session={session}>
        <Head>
          <meta
            name={'viewport'}
            content={'initial-scale=1, width=device-width'}
          />
          <title>Mern-Next-Auth-GoogleBook</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </SessionProvider>
    </CacheProvider>
  );
}
