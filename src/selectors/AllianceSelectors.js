export const getEventAlliances = (state, eventKey) =>
  state.getIn(["models", "eventAlliances", "collections", "byEvent", eventKey]);

export const getEventAlliancesFetchStatus = (state, eventKey) =>
  state.getIn([
    "models",
    "eventAlliancesStatus",
    "collections",
    "byEvent",
    eventKey,
  ]);
