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

// From https://github.com/immutable-js/immutable-js/issues/1452#issuecomment-386162309
const isMergeable = (a) => (
    a && typeof a === 'object' && typeof a.mergeWith === 'function' && !List.isList(a)
);

// Default mergeDeep behavior concatenates Lists. We want to merge by index.
export const mergeDeep = (a, b) => {
    // If b is null, it would overwrite a, even if a is mergeable
    if (isMergeable(a) && b !== null) {
        return a.mergeWith(mergeDeep, b);
    }

    if (!List.isList(a) || !List.isList(b)) {
        return b;
    }

    return b.reduce((acc, nextItem, index) => {
        const existingItem = acc.get(index);
        if (isMergeable(existingItem)) {
            return acc.set(index, existingItem.mergeWith(mergeDeep, nextItem));
        }

        return acc.set(index, nextItem);
    }, a);
};

const mergeDeepSingle = (state, data) => {
  if (state === undefined) {
    return data
  }
  return state = mergeDeep(state, data)
}

const mergeDeepMulti = (state = Map(), data) => {
  // Wrapper for Map.mergeDeep that handles undefined state
  return state = mergeDeep(state, data)
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
