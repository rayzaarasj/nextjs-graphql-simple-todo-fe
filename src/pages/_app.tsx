/* eslint-disable @typescript-eslint/no-var-requires */
import React, { ReactElement } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../lib/theme';
import { Header } from '@components/Header';
import { Box } from '@material-ui/core';
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client';

function createLink(): ApolloLink {
  const { HttpLink } = require('@apollo/client/link/http');
  return new HttpLink({
    // TODO: GraphQL サーバのモックをやめるときに、環境変数から URI を取得するようにする
    uri: 'http://localhost:3001/graphql/',
    // TODO: token 情報のセットが必要になった場合は変更する
    credentials: 'same-origin',
  });
}

export default function MyApp(props: AppProps): ReactElement {
  const { Component, pageProps } = props;

  const apolloClient = new ApolloClient({
    link: createLink(),
    cache: new InMemoryCache(),
  });

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <React.Fragment>
        <Head>
          <title>My page</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Header></Header>
          <Box height="2rem" />
          <Component {...pageProps} />
        </ThemeProvider>
      </React.Fragment>
    </ApolloProvider>
  );
}
