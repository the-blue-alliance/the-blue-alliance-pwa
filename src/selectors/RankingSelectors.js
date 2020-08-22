export const getEventRankingsFetchStatus = (state, rankingKey) =>
  state.getIn(["models", "rankingsStatus", "byKey", rankingKey]);

export const getEventRankings = (state, rankingKey) =>
  state.getIn(["models", "rankings", "byKey", rankingKey]);
