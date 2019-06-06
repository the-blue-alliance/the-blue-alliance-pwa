import React from "react";
import App, { Container } from "next/app";
import { Provider } from "react-redux";
import withReduxStore from "../lib/withReduxStore";
import CssBaseline from "@material-ui/core/CssBaseline";
import RouteChangeProgress from "../components/RouteChangeProgress";
import ThemeProvider from "../components/ThemeProvider";
import Navigation from "../components/Navigation";

class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Provider store={reduxStore}>
          <ThemeProvider>
            <CssBaseline />
            <RouteChangeProgress />
            <Navigation />
            <Component {...pageProps} />
          </ThemeProvider>
        </Provider>
      </Container>
    );
  }
}

export default withReduxStore(MyApp);
