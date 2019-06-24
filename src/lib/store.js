import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { List, Map } from "immutable";
import createReducer from "../reducers";

import Event from "../database/Event";
import Match from "../database/Match";

function initializeStore(state) {
  return createStore(
    createReducer(),
    state,
    composeWithDevTools(applyMiddleware(thunk))
  );
}

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

function getOrCreateStore(initialState = Map()) {
  // Always make a new store if server, otherwise state is shared between requests
  if (!process.browser) {
    return initializeStore(initialState);
  }

  if (initialState !== Map()) {
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

export default getOrCreateStore;
