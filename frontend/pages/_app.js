/* eslint-disable no-underscore-dangle */
import React, { useEffect } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import Head from "next/head";
import "../styles/globals.css";
import { PersistGate } from "redux-persist/integration/react";
import { useStore } from "react-redux";
import ProgressBar from "@components/common/progressBar";
import theme from "../styles/theme";
import { wrapper } from "../redux/store";

function MyApp(props) {
  const { Component, pageProps } = props;
  const store = useStore((state) => state);

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>MyRecipe</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <StylesProvider injectFirst>
        <StyledThemeProvider theme={theme}>
          <MuiThemeProvider theme={theme}>
            <Head>
              <title>MyRecipe</title>
              <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
              />
            </Head>
            <CssBaseline />
            <PersistGate
              persistor={store.__persistor}
              loading={<div>loading...</div>}
            >
              <ProgressBar />
              <Component {...pageProps} />
            </PersistGate>
          </MuiThemeProvider>
        </StyledThemeProvider>
      </StylesProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
