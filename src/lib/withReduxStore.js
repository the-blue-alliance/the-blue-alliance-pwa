import React from "react";
import PropTypes from "prop-types";
import { fromJS, List } from "immutable";
import initializeStore from "./store";

import Event from "../database/Event";
import Match from "../database/Match";

const isServer = typeof window === "undefined";
const __NEXT_REDUX_STORE__ = "__NEXT_REDUX_STORE__";

const MODEL_TYPES = {
  events: Event,
  matches: Match,
};

const convertCollections = (
  state,
  collectionsPath,
  collectionEntries,
  collectionKey
) => {
  // Turn preloaded collections from Lists to Sets
  // Do recursively
  collectionEntries.forEach((collection, entryKey) => {
    if (collection instanceof List) {
      state = state.setIn(
        collectionsPath.concat([collectionKey, entryKey]),
        collection.toSet()
      );
    } else {
      state = convertCollections(
        state,
        collectionsPath.concat(collectionKey),
        collection,
        entryKey
      );
    }
  });
  return state;
};

function getOrCreateStore(initialState) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore(initialState);
  }

  if (initialState) {
    // Convert to typed models on client
    Object.keys(MODEL_TYPES).forEach(key => {
      const modelPath = ["models", key, "byKey"];
      const models = initialState.getIn(modelPath);
      if (models) {
        initialState = initialState.setIn(
          modelPath,
          models.map(o => new MODEL_TYPES[key](o))
        );
      }

      // Convert collection Lists to Sets
      // Turn collection keys to integers if it is a number
      const collectionsPath = ["models", key, "collections"];
      const collections = initialState.getIn(collectionsPath);
      if (collections) {
        collections.forEach((collectionEntries, collectionKey) => {
          initialState = convertCollections(
            initialState,
            collectionsPath,
            collectionEntries,
            collectionKey
          );
        });
      }
    });
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState);
  }
  return window[__NEXT_REDUX_STORE__];
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
        appProps = await App.getInitialProps(appContext);
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
