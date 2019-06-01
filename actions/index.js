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
      status: 'success',
      data: events,
    }))
}

export const fetchEventPage = eventKey => dispatch => {
  dispatch({
    type: types.FETCH_EVENT_REQUEST,
    eventKey,
  })
  return fetch(`https://www.thebluealliance.com/api/v3/event/${eventKey}`, fetchOptions)
    .then(event => event.json())
    .then(event => dispatch({
      type: types.FETCH_EVENT_SUCCESS,
      eventKey,
      status: 'success',
      data: event,
    }))
}
