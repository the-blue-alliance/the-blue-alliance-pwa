import { createSelector } from "reselect";

const getEventsByKey = state => state.getIn(["models", "events", "byKey"]);

const getYearEventKeys = (state, year) =>
  state.getIn(["models", "events", "collections", "byYear", `${year}`]);

export const getYearEventsStatus = (state, year) =>
  state.getIn(["models", "eventsStatus", "collections", "byYear", `${year}`]);

export const getYearEvents = createSelector(
  getEventsByKey,
  getYearEventKeys,
  (eventsByKey, keys) => {
    if (keys) {
      return keys.toSeq().map(key => eventsByKey.get(key));
    }
  }
);

export const getEventFetchStatus = (state, eventKey) =>
  state.getIn(["models", "eventsStatus", "byKey", eventKey]);

export const getEvent = (state, eventKey) =>
  state.getIn(["models", "events", "byKey", eventKey]);
