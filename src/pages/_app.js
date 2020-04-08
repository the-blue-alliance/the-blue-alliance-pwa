import "../lib/init";
import React from "react";
import App from "next/app";
import { Provider } from "react-redux";
import withReduxStore from "../lib/withReduxStore";
import errorReporter from "../lib/errorReporter";
import CssBaseline from "@material-ui/core/CssBaseline";
import TopLevelError from "../components/TopLevelError";
import RouteChangeProgress from "../components/RouteChangeProgress";
import ThemeProvider from "../components/ThemeProvider";
import Navigation from "../components/Navigation";

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
      <Provider store={reduxStore}>
        <ThemeProvider>
          <CssBaseline />
          {hasError ? (
            <TopLevelError />
          ) : (
            <>
              <RouteChangeProgress />
              <Navigation />
              <Component {...pageProps} />
            </>
          )}
        </ThemeProvider>
      </Provider>
    );
  }
}

export default withReduxStore(MyApp);
