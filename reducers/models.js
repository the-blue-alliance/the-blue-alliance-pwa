import { fromJS, Map } from 'immutable'
import * as types from '../constants/ActionTypes'
import { updateMulti } from '../lib/reduxImmutableMergeHelpers'
import Event from '../database/Event'

const models = (state = Map(), action) => {
  switch (action.type) {
    case types.FETCH_YEAR_EVENTS_REQUEST:
      return state.setIn(['eventsStatus', 'collections', 'byYear', `${action.year}`], 'fetching')
    case types.FETCH_YEAR_EVENTS_SUCCESS:
      state = updateMulti(
        state,
        'events',
        ['byYear', `${action.year}`],
        fromJS(action.data).map(o => new Event(o))
      )
      return state.setIn(['eventsStatus', 'collections', 'byYear', `${action.year}`], 'success')
    default:
      return state
  }
}
export default models
