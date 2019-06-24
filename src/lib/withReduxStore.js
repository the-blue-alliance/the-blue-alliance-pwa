import React from "react";
import PropTypes from "prop-types";
import { fromJS } from "immutable";
import getOrCreateStore from "./store";

// Trace getInitialProps on server
let tracer;
if (!process.browser) {
  tracer = require("@google-cloud/trace-agent").get();
}

export default App => {
  const awr = class AppWithRedux extends React.Component {
    static async getInitialProps(appContext) {
      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState
      const reduxStore = getOrCreateStore();

      // Provide the store to getInitialProps of pages
      appContext.ctx.reduxStore = reduxStore;

      let appProps = {};
      if (typeof App.getInitialProps === "function") {
        if (tracer) {
          const span = tracer.createChildSpan({ name: "getInitialProps" });
          appProps = await App.getInitialProps(appContext);
          span.endSpan();
        } else {
          appProps = await App.getInitialProps(appContext);
        }
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState(),
      };
    }

    constructor(props) {
      super(props);
      this.reduxStore = getOrCreateStore(fromJS(props.initialReduxState));
    }

    render() {
      return <App {...this.props} reduxStore={this.reduxStore} />;
    }
  };

  awr.propTypes = {
    initialReduxState: PropTypes.object,
  };

  return awr;
};
