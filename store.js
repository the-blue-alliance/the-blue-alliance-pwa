import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { fromJS } from 'immutable'

const initialState = fromJS({
  events: null,
  source: null,
})

export const actionTypes = {
  SET_EVENT_LIST: 'SET_EVENT_LIST',
  SET_SOURCE: 'SET_SOURCE',
}

// REDUCERS
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_EVENT_LIST:
      return state.merge({
        events: fromJS(action.events),
        source: action.source,
      })
      case actionTypes.SET_SOURCE:
        return state.merge({
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

export function initializeStore (state = initialState) {
  return createStore(
    reducer,
    state,
    composeWithDevTools(applyMiddleware())
  )
}
