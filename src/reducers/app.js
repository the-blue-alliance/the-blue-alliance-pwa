import * as types from "../constants/ActionTypes";
import { Map } from "immutable";

export const defaultState = Map({
  historyState: Map(),
  darkTheme: false,
});

const app = (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_HISTORY_STATE:
      return state.set("historyState", action.state);
    case types.TOGGLE_THEME:
      return state.set("darkTheme", !state.get("darkTheme"));
    default:
      return state;
  }
};
export default app;
