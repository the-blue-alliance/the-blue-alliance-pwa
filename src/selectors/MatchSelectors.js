import { createSelector } from "reselect";

const getMatchesByKey = state => state.getIn(["models", "matches", "byKey"]);

const getEventMatchKeys = (state, eventKey) =>
  state.getIn(["models", "matches", "collections", "byEvent", eventKey]);

export const getEventMatchesFetchStatus = (state, eventKey) =>
  state.getIn(["models", "matchesStatus", "collections", "byEvent", eventKey]);

export const getEventMatches = createSelector(
  getMatchesByKey,
  getEventMatchKeys,
  (matchesByKey, keys) => {
    if (keys) {
      return keys.toSeq().map(key => matchesByKey.get(key));
    }
  }
);

export const getMatchFetchStatus = (state, matchKey) =>
  state.getIn(["models", "matchesStatus", "byKey", matchKey]);

export const getMatch = (state, matchKey) =>
  state.getIn(["models", "matches", "byKey", matchKey]);
