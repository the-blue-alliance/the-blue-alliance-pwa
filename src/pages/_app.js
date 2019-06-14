import React from "react";
import * as firebase from "firebase/app";
import App, { Container } from "next/app";
import Router from "next/router";
import { Provider } from "react-redux";
import withReduxStore from "../lib/withReduxStore";
import * as gtag from "../lib/gtag";
import { isProd } from "../lib/utils";
import errorReporter from "../lib/errorReporter";
import CssBaseline from "@material-ui/core/CssBaseline";
import Error from "../components/Error";
import RouteChangeProgress from "../components/RouteChangeProgress";
import ThemeProvider from "../components/ThemeProvider";
import Navigation from "../components/Navigation";

// Import Performance Monitoring on client only
if (process.browser) {
  require("firebase/performance");
}
// Initialize Firebase if not already initialized
if (firebase.apps.length === 0) {
  firebase.initializeApp(__FIREBASE_CONFIG__);
  // Initialize Performance Monitoring on client only
  if (isProd && process.browser) {
    firebase.performance();
  }
}

if (isProd) {
  Router.events.on("routeChangeComplete", url => gtag.pageview(url));
}

class MyApp extends App {
  state = {
    hasError: false,
  };

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  componentDidCatch(error) {
    errorReporter.report(error);
    this.setState({ hasError: true });
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    const { hasError } = this.state;
    return (
      <Container>
        <Provider store={reduxStore}>
          <ThemeProvider>
            <CssBaseline />
            {hasError ? (
              <Error />
            ) : (
              <>
                <RouteChangeProgress />
                <Navigation />
                <Component {...pageProps} />
              </>
            )}
          </ThemeProvider>
        </Provider>
      </Container>
    );
  }
}

export default withReduxStore(MyApp);
