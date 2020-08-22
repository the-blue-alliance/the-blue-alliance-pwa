export const getEventRankingsFetchStatus = (state, rankingKey) =>
  state.getIn(["models", "eventRankingsStatus", "byKey", rankingKey]);

export const getEventRankings = (state, rankingKey) =>
  state.getIn(["models", "rankings", "byKey", rankingKey]);
