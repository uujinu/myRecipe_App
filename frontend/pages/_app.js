import React from "react";
import NextApp from "next/app";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import Head from "next/head";
import theme from "../styles/theme";
import "../styles/globals.css";
import { wrapper } from "../redux/store";

class _App extends NextApp {
  componentDidMount() {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
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
            <Component {...pageProps} />
          </MuiThemeProvider>
        </StyledThemeProvider>
      </StylesProvider>
    );
  }
}

export default wrapper.withRedux(_App);
