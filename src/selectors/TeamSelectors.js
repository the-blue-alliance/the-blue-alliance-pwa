import { createSelector } from "reselect";

const getTeamsByKey = state => state.getIn(["models", "teams", "byKey"]);

const getAllTeamKeys = state =>
  state.getIn(["models", "teams", "collections", "all"]);

export const getAllTeamsFetchStatus = state =>
  state.getIn(["models", "teamsStatus", "collections", "all"]);

export const getAllTeams = createSelector(
  getTeamsByKey,
  getAllTeamKeys,
  (teamsByKey, keys) => {
    if (keys) {
      return keys
        .toSeq()
        .map(key => teamsByKey.get(key))
        .sort((a, b) => a.team_number - b.team_number);
    }
  }
);
