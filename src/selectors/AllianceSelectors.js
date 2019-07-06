export const getEventAlliances = (state, eventKey) =>
  state.getIn(["models", "alliances", "collections", "byEvent", eventKey]);

export const getEventAlliancesFetchStatus = (state, eventKey) =>
  state.getIn([
    "models",
    "alliancesStatus",
    "collections",
    "byEvent",
    eventKey,
  ]);
