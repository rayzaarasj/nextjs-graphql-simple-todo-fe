import React, { ReactElement } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../lib/theme';
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Button,
  Link,
} from '@material-ui/core';

export default function MyApp(props: AppProps): ReactElement {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
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
        <AppBar position="static">
          <Container>
            <Toolbar variant="dense">
              <Typography
                variant="h6"
                color="inherit"
                style={{ borderRight: '0.1em solid white', padding: '0.5em' }}
              >
                <Link href="/" color="inherit" underline="none">
                  SimpleTodo
                </Link>
              </Typography>
              <Button color="inherit" href="todos">
                Todos
              </Button>
              <Button color="inherit" href="categories">
                Categories
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  );
}
