import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

const exampleInitialState = {
  events: null,
  source: null,
}

export const actionTypes = {
  SET_EVENT_LIST: 'SET_EVENT_LIST',
  SET_SOURCE: 'SET_SOURCE',
}

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case actionTypes.SET_EVENT_LIST:
      return Object.assign({}, state, {
        events: action.events,
        source: action.source,
      })
      case actionTypes.SET_SOURCE:
        return Object.assign({}, state, {
          source: action.source,
        })
    default:
      return state
  }
}

// ACTIONS
export const setEventList = (events, source) => {
  return { type: actionTypes.SET_EVENT_LIST, events, source}
}

export const setSource = (source) => {
  return { type: actionTypes.SET_SOURCE, source}
}

export function initializeStore (initialState = exampleInitialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware())
  )
}
