import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { List, Map } from "immutable";
import createReducer from "../reducers";

import Event from "../database/Event";
import Match from "../database/Match";
import Team from "../database/Team";

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
  teams: Team,
};

const convertCollections = (state, path, entry) => {
  // Turn preloaded collections from Lists to Sets
  // Do recursively
  if (entry instanceof Map) {
    entry.forEach((collectionEntries, collectionKey) => {
      state = convertCollections(
        state,
        path.concat([collectionKey]),
        collectionEntries
      );
    });
  } else if (entry instanceof List) {
    state = state.setIn(path, entry.toSet());
  }
  return state;
};

function getOrCreateStore(initialState = Map()) {
  if (initialState !== Map()) {
    // Convert to typed models
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
      const collectionsPath = ["models", key, "collections"];
      const collections = initialState.getIn(collectionsPath);
      if (collections) {
        initialState = convertCollections(
          initialState,
          collectionsPath,
          collections
        );
      }
    });
  }

  // Always make a new store if server, otherwise state is shared between requests
  if (!process.browser) {
    return initializeStore(initialState);
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState);
  }
  return window[__NEXT_REDUX_STORE__];
}

export default getOrCreateStore;
