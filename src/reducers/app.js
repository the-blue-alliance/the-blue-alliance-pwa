import * as types from "../constants/ActionTypes";
import { Map } from "immutable";

export const defaultState = Map({
  darkTheme: false,
});

const app = (state = defaultState, action) => {
  switch (action.type) {
    case types.TOGGLE_THEME:
      return state.set("darkTheme", !state.get("darkTheme"));
    default:
      return state;
  }
};
export default app;
