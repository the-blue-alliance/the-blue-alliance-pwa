export const getEventAlliances = (state, eventKey) =>
  state.getIn(["models", "eventAlliances", "byKey", eventKey]);

export const getEventAlliancesFetchStatus = (state, eventKey) =>
  state.getIn(["models", "eventAlliancesStatus", "byKey", eventKey]);
