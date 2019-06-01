import { createSelector } from "reselect";

const getMatchesByKey = state => state.getIn(["models", "matches", "byKey"]);

const getEventMatchKeys = (state, eventKey) =>
  state.getIn(["models", "matches", "collections", "byEvent", eventKey]);

export const getEventMatchesStatus = (state, eventKey) =>
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
