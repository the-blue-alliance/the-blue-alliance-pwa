import fetch from "isomorphic-unfetch";
import * as types from "../constants/ActionTypes";

const baseURL = "https://www.thebluealliance.com";
const fetchOptions = {
  headers: {
    "X-TBA-Auth-Key": __TBA_API_AUTH_KEY__,
  },
};

// Trace fetch on server
let tracer;
if (!process.browser) {
  tracer = require("@google-cloud/trace-agent").get();
}
const tracedFetch = (url, options) => {
  if (tracer) {
    const span = tracer.createChildSpan({ name: `fetch: ${url}` });
    return fetch(url, options).then(result => {
      span.endSpan();
      return result;
    });
  }
  return fetch(url, options);
};

const handleErrors = response => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

// App
export const toggleTheme = () => dispatch => {
  dispatch({
    type: types.TOGGLE_THEME,
  });
};

// Event list page
export const fetchYearEvents = year => dispatch => {
  dispatch({
    type: types.FETCH_YEAR_EVENTS_REQUEST,
    year,
  });
  return tracedFetch(`${baseURL}/api/v3/events/${year}`, fetchOptions)
    .then(handleErrors)
    .then(events =>
      dispatch({
        type: types.FETCH_YEAR_EVENTS_SUCCESS,
        year,
        data: events,
      })
    )
    .catch(() => {
      dispatch({
        type: types.FETCH_YEAR_EVENTS_ERROR,
        year,
      });
    });
};

// Event details page
export const fetchEvent = eventKey => dispatch => {
  dispatch({
    type: types.FETCH_EVENT_REQUEST,
    eventKey,
  });
  return tracedFetch(`${baseURL}/api/v3/event/${eventKey}`, fetchOptions)
    .then(handleErrors)
    .then(event =>
      dispatch({
        type: types.FETCH_EVENT_SUCCESS,
        eventKey,
        data: event,
      })
    )
    .catch(() => {
      dispatch({
        type: types.FETCH_EVENT_ERROR,
        eventKey,
      });
    });
};

export const fetchEventMatches = eventKey => dispatch => {
  dispatch({
    type: types.FETCH_EVENT_MATCHES_REQUEST,
    eventKey,
  });
  return tracedFetch(
    `${baseURL}/api/v3/event/${eventKey}/matches`,
    fetchOptions
  )
    .then(handleErrors)
    .then(matches =>
      dispatch({
        type: types.FETCH_EVENT_MATCHES_SUCCESS,
        eventKey,
        data: matches,
      })
    )
    .catch(() => {
      dispatch({
        type: types.FETCH_EVENT_MATCHES_ERROR,
        eventKey,
      });
    });
};

// Match page
export const fetchMatch = matchKey => dispatch => {
  dispatch({
    type: types.FETCH_MATCH_REQUEST,
    matchKey,
  });
  return tracedFetch(`${baseURL}/api/v3/match/${matchKey}`, fetchOptions)
    .then(handleErrors)
    .then(match =>
      dispatch({
        type: types.FETCH_MATCH_SUCCESS,
        matchKey,
        data: match,
      })
    )
    .catch(() => {
      dispatch({
        type: types.FETCH_MATCH_ERROR,
        matchKey,
      });
    });
};

// Team list page
export const fetchAllTeamsHelper = pageNum => {
  return tracedFetch(`${baseURL}/api/v3/teams/${pageNum}`, fetchOptions).then(
    handleErrors
  );
};

export const fetchAllTeams = () => dispatch => {
  dispatch({
    type: types.FETCH_ALL_TEAMS_REQUEST,
  });

  const fetchPromises = [];
  // TODO: don't hardcode
  for (let pageNum = 0; pageNum < 16; pageNum++) {
    fetchPromises.push(fetchAllTeamsHelper(pageNum));
  }
  return Promise.all(fetchPromises)
    .then(pageOfTeams => {
      let allTeams = [];
      pageOfTeams.forEach(page => (allTeams = allTeams.concat(page)));
      dispatch({
        type: types.FETCH_ALL_TEAMS_SUCCESS,
        data: allTeams,
      });
    })
    .catch(() =>
      dispatch({
        type: types.FETCH_ALL_TEAMS_ERROR,
      })
    );
};
