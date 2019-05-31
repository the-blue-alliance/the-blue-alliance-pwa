import { List, Map, Set } from 'immutable'

// From https://github.com/immutable-js/immutable-js/issues/1452#issuecomment-386162309
const isMergeable = (a) => (
    a && typeof a === 'object' && typeof a.mergeWith === 'function' && !List.isList(a)
);

// Default mergeDeep behavior concatenates Lists. We want to merge by index.
const mergeDeep = (a, b) => {
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

export const updateSingle = (state, modelType, modelKey, newModel) => {
  // Merge newModel into current model
  // TODO: Delete model is null
  const modelPath = [modelType, 'byKey', modelKey]
  const currentModel = state.getIn(modelPath)
  return state.setIn(modelPath, mergeDeepSingle(currentModel, newModel))
}

export const updateMulti = (state, modelType, partialPath, newModels, merge=false) => {
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
