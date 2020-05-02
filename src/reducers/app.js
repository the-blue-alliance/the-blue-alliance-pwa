import * as types from "../constants/ActionTypes";
import { Map } from "immutable";

export const defaultState = Map({
  historyState: Map(),
});

const app = (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_HISTORY_STATE:
      return state.set("historyState", action.state);
    default:
      return state;
  }
};
export default app;
