import { fromJS, Map } from 'immutable'
import * as types from '../constants/ActionTypes'
import { updateSingle, updateMulti } from '../lib/reduxImmutableMergeHelpers'
import Event from '../database/Event'

// const models = (state = Map(), action) => {
//   switch (action.type) {
//     case types.FETCH_YEAR_EVENTS:
//       return state.setIn(['events', `${action.year}`, 'fetching'], true)
//     case types.SET_YEAR_EVENTS:
//       state = state.setIn(['events', `${action.year}`, 'fetching'], false)
//       return state.setIn(['events', `${action.year}`, 'data'], fromJS(action.events))
//     default:
//       return state
//   }
// }
//
// export default models

const models = (state = Map(), action) => {
  switch (action.type) {
    case types.SET_YEAR_EVENTS:
      return updateMulti(
        state,
        'events',
        ['byYear', action.year],
        fromJS(action.events).map(o => new Event(o)))
    default:
      return state
  }
}
export default models
