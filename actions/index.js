import fetch from 'isomorphic-unfetch'
import * as types from '../constants/ActionTypes'

const fetchOptions = {
  headers: {
    'X-TBA-Auth-Key': 'POvVo9CNx9v7GKzQdHTgpru5S1G3sDjrsiA3FtbFCeedQsBJPN1VN06IYsNbKgCf'
  }
}

export const fetchEventListPage = year => dispatch => {
  dispatch({
    type: types.FETCH_YEAR_EVENTS_REQUEST,
    year,
  })
  return fetch(`https://www.thebluealliance.com/api/v3/events/${year}`, fetchOptions)
    .then(events => events.json())
    .then(events => dispatch({
      type: types.FETCH_YEAR_EVENTS_SUCCESS,
      year,
      data: events,
    }))
}

export const fetchEventPage = eventKey => dispatch => {
  dispatch({
    type: types.FETCH_EVENT_REQUEST,
    eventKey,
  })
  dispatch({
    type: types.FETCH_EVENT_MATCHES_REQUEST,
    eventKey,
  })
  return Promise.all([
    fetch(`https://www.thebluealliance.com/api/v3/event/${eventKey}`, fetchOptions)
      .then(event => event.json())
      .then(event => dispatch({
        type: types.FETCH_EVENT_SUCCESS,
        eventKey,
        data: event,
      })),
    fetch(`https://www.thebluealliance.com/api/v3/event/${eventKey}/matches`, fetchOptions)
      .then(matches => matches.json())
      .then(matches => dispatch({
        type: types.FETCH_EVENT_MATCHES_SUCCESS,
        eventKey,
        data: matches,
      })),
  ])
}
