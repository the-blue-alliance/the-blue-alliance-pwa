import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { fromJS } from 'immutable'
import * as types from './constants/ActionTypes'

const initialState = fromJS({})

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_YEAR_EVENTS:
      return state.setIn(['models', 'events', `${action.year}`, 'fetching'], true)
    case types.SET_YEAR_EVENTS:
      state = state.setIn(['models', 'events', `${action.year}`, 'fetching'], false)
      return state.setIn(['models', 'events', `${action.year}`, 'data'], fromJS(action.events))
    default:
      return state
  }
}

export function initializeStore (state = initialState) {
  return createStore(
    reducer,
    state,
    composeWithDevTools(applyMiddleware(thunk))
  )
}
