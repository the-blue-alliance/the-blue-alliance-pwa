import { fromJS, List, Map, Set } from 'immutable'
import * as types from '../constants/ActionTypes'
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

const mergeDeepSingle = (state, data) => {
  if (state === undefined) {
    return data
  }
  return state.mergeDeep(data)
}

const mergeDeepMulti = (state = Map(), data) => {
  // Wrapper for Map.mergeDeep that handles undefined state
  return state.mergeDeep(data)
}

const updateSingle = (state, modelType, modelKey, newModel) => {
  // Merge newModel into current model
  // TODO: Delete model is null
  const modelPath = [modelType, 'byKey', modelKey]
  const currentModel = state.getIn(modelPath)
  return state.setIn(modelPath, mergeDeepSingle(currentModel, newModel))
}

const updateMulti = (state, modelType, partialPath, newModels, merge=false) => {
  let newModelsByKey = Map()
  newModels.forEach(o => newModelsByKey = newModelsByKey.set(o.get('key'), o))

  // Merge new models into current models
  const byKeyPath = [modelType].concat(['byKey'])
  const mergedModelsByKey = mergeDeepMulti(state.getIn(byKeyPath), newModelsByKey)

  // Merge new collection into current collection
  const collectionPath = [modelType, 'collections'].concat(partialPath)
  const mergedCollection = updateCollection(
    state.getIn(collectionPath),
    newModelsByKey,
    merge
  )
  return state.setIn(
    byKeyPath,
    mergedModelsByKey
  ).setIn(
    collectionPath,
    mergedCollection
  )
}

const updateCollection = (state = Set(), newModelsByKey, merge) => {
  // Helper to merge collection into current collection
  if (state instanceof List) {  // Might get a list due to SSR
    state = Set(state)
  }
  const newKeys = Set(newModelsByKey.keys())
  if (!merge) { // Whether to merge or overwrite the collection
    const toRemove = state.subtract(newKeys)
    toRemove.forEach(key => state = state.remove(key))
  }
  state = state.union(newKeys)
  return state
}

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
