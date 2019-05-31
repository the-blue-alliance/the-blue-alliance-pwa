import fetch from 'isomorphic-unfetch'
import * as types from '../constants/ActionTypes'

const fetchOptions =  {
  headers: {
    'X-TBA-Auth-Key': 'POvVo9CNx9v7GKzQdHTgpru5S1G3sDjrsiA3FtbFCeedQsBJPN1VN06IYsNbKgCf',
  },
}

export const fetchEventListPage = year => {
  return dispatch => {
    dispatch({
      type: types.FETCH_YEAR_EVENTS,
      year,
    })
    return fetch(`https://www.thebluealliance.com/api/v3/events/${year}`, fetchOptions)
      .then(events => events.json())
      .then(events => dispatch({
        type: types.SET_YEAR_EVENTS,
        year,
        events,
      }))
  }
}
