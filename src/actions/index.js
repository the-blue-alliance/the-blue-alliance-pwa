import fetch from "isomorphic-unfetch";
import * as types from "../constants/ActionTypes";

const fetchOptions = {
  headers: {
    "X-TBA-Auth-Key":
      "POvVo9CNx9v7GKzQdHTgpru5S1G3sDjrsiA3FtbFCeedQsBJPN1VN06IYsNbKgCf"
  }
};

const handleErrors = response => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

// Event list page
export const fetchYearEvents = year => dispatch => {
  dispatch({
    type: types.FETCH_YEAR_EVENTS_REQUEST,
    year
  });
  return fetch(
    `https://www.thebluealliance.com/api/v3/events/${year}`,
    fetchOptions
  )
    .then(handleErrors)
    .then(events =>
      dispatch({
        type: types.FETCH_YEAR_EVENTS_SUCCESS,
        year,
        data: events
      })
    )
    .catch(() => {
      dispatch({
        type: types.FETCH_YEAR_EVENTS_ERROR,
        year
      });
    });
};

// Event details page
export const fetchEvent = eventKey => dispatch => {
  dispatch({
    type: types.FETCH_EVENT_REQUEST,
    eventKey
  });
  return fetch(
    `https://www.thebluealliance.com/api/v3/event/${eventKey}`,
    fetchOptions
  )
    .then(handleErrors)
    .then(event =>
      dispatch({
        type: types.FETCH_EVENT_SUCCESS,
        eventKey,
        data: event
      })
    )
    .catch(() => {
      dispatch({
        type: types.FETCH_EVENT_ERROR,
        eventKey
      });
    });
};

export const fetchEventMatches = eventKey => dispatch => {
  dispatch({
    type: types.FETCH_EVENT_MATCHES_REQUEST,
    eventKey
  });
  return fetch(
    `https://www.thebluealliance.com/api/v3/event/${eventKey}/matches`,
    fetchOptions
  )
    .then(handleErrors)
    .then(matches =>
      dispatch({
        type: types.FETCH_EVENT_MATCHES_SUCCESS,
        eventKey,
        data: matches
      })
    )
    .catch(() => {
      dispatch({
        type: types.FETCH_EVENT_MATCHES_ERROR,
        eventKey
      });
    });
};
