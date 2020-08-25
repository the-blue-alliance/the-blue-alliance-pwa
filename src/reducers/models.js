import { fromJS, Map } from "immutable";
import * as types from "../constants/ActionTypes";
import { updateSingle, updateMulti } from "../lib/reduxImmutableMergeHelpers";
import Event from "../database/Event";
import Match from "../database/Match";
import Team from "../database/Team";

const models = (state = Map(), action) => {
  switch (action.type) {
    case types.FETCH_YEAR_EVENTS_REQUEST:
      return state.setIn(
        ["eventsStatus", "collections", "byYear", `${action.year}`],
        "fetching"
      );
    case types.FETCH_YEAR_EVENTS_SUCCESS:
      state = updateMulti(
        state,
        "events",
        ["byYear", `${action.year}`],
        fromJS(action.data).map(o => new Event(o))
      );
      return state.setIn(
        ["eventsStatus", "collections", "byYear", `${action.year}`],
        "success"
      );
    case types.FETCH_YEAR_EVENTS_ERROR:
      return state.setIn(
        ["eventsStatus", "collections", "byYear", `${action.year}`],
        "error"
      );
    case types.FETCH_EVENT_REQUEST:
      return state.setIn(
        ["eventsStatus", "byKey", `${action.eventKey}`],
        "fetching"
      );
    case types.FETCH_EVENT_SUCCESS:
      state = updateSingle(
        state,
        "events",
        action.eventKey,
        new Event(fromJS(action.data))
      );
      return state.setIn(
        ["eventsStatus", "byKey", `${action.eventKey}`],
        "success"
      );
    case types.FETCH_EVENT_ERROR:
      return state.setIn(
        ["eventsStatus", "byKey", `${action.eventKey}`],
        "error"
      );
    case types.FETCH_EVENT_MATCHES_REQUEST:
      return state.setIn(
        ["matchesStatus", "collections", "byEvent", `${action.eventKey}`],
        "fetching"
      );
    case types.FETCH_EVENT_MATCHES_SUCCESS:
      state = updateMulti(
        state,
        "matches",
        ["byEvent", `${action.eventKey}`],
        fromJS(action.data).map(o => new Match(o))
      );
      return state.setIn(
        ["matchesStatus", "collections", "byEvent", `${action.eventKey}`],
        "success"
      );
    case types.FETCH_EVENT_MATCHES_ERROR:
      return state.setIn(
        ["matchesStatus", "collections", "byEvent", `${action.eventKey}`],
        "error"
      );
    case types.FETCH_EVENT_ALLIANCES_REQUEST:
      return state.setIn(
        ["eventAlliancesStatus", "byKey", `${action.eventKey}`],
        "fetching"
      );
    case types.FETCH_EVENT_ALLIANCES_SUCCESS:
      state = updateSingle(
        state,
        "eventAlliances",
        action.eventKey,
        fromJS(action.data)
      );
      return state.setIn(
        ["eventAlliancesStatus", "byKey", `${action.eventKey}`],
        "success"
      );
    case types.FETCH_EVENT_ALLIANCES_ERROR:
      return state.setIn(
        ["eventAlliancesStatus", "byKey", "byEvent", `${action.eventKey}`],
        "error"
      );
    case types.FETCH_MATCH_REQUEST:
      return state.setIn(
        ["matchesStatus", "byKey", `${action.matchKey}`],
        "fetching"
      );
    case types.FETCH_MATCH_SUCCESS:
      state = updateSingle(
        state,
        "matches",
        action.matchKey,
        new Match(fromJS(action.data))
      );
      return state.setIn(
        ["matchesStatus", "byKey", `${action.matchKey}`],
        "success"
      );
    case types.FETCH_MATCH_ERROR:
      return state.setIn(
        ["matchesStatus", "byKey", `${action.matchKey}`],
        "error"
      );
    case types.FETCH_ALL_TEAMS_REQUEST:
      return state.setIn(["teamsStatus", "collections", "all"], "fetching");
    case types.FETCH_ALL_TEAMS_SUCCESS:
      state = updateMulti(
        state,
        "teams",
        ["all"],
        fromJS(action.data).map(o => new Team(o))
      );
      return state.setIn(["teamsStatus", "collections", "all"], "success");
    case types.FETCH_ALL_TEAMS_ERROR:
      return state.setIn(["teamsStatus", "collections", "all"], "error");
    case types.FETCH_ALL_EVENTS_REQUEST:
      return state.setIn(["eventsStatus", "collections", "all"], "fetching");
    case types.FETCH_ALL_EVENTS_SUCCESS:
      state = updateMulti(
        state,
        "events",
        ["all"],
        fromJS(action.data).map(o => new Event(o))
      );
      return state.setIn(["eventsStatus", "collections", "all"], "success");
    case types.FETCH_ALL_EVENTS_ERROR:
      return state.setIn(["eventsStatus", "collections", "all"], "error");
    default:
      return state;
    case types.FETCH_EVENT_RANKINGS_REQUEST:
      return state.setIn(
        ["eventRankingsStatus", "byKey", `${action.eventKey}`],
        "fetching"
      );
    case types.FETCH_EVENT_RANKINGS_SUCCESS:
      state = updateSingle(
        state,
        "rankings",
        action.eventKey,
        fromJS(action.data)
      );
      return state.setIn(
        ["eventRankingsStatus", "byKey", `${action.eventKey}`],
        "success"
      );
    case types.FETCH_EVENT_RANKINGS_ERROR:
      return state.setIn(
        ["eventRankingsStatus", "byKey", `${action.eventKey}`],
        "error"
      );
  }
};
export default models;
