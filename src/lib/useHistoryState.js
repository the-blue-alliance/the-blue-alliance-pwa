import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { SET_HISTORY_STATE } from "../constants/ActionTypes";

const hasHistory = typeof history !== "undefined" && history.state;

const setStateValue = (key, value) => dispatch => {
  const state = { [key]: value };
  hasHistory && history.replaceState(state);
  dispatch({
    type: SET_HISTORY_STATE,
    state,
  });
};

const useHistoryState = (key, defaultValue) => {
  const isNewHistory = hasHistory && history.state.modalDepth === undefined;
  const [init, setInit] = React.useState(isNewHistory);
  const dispatch = useDispatch();

  const value = useSelector(state => state.getIn(["app", "historyState", key]));

  // callback to update value
  const setValue = React.useCallback(
    newValue => {
      dispatch(setStateValue(key, newValue));
    },
    [dispatch, key]
  );

  // set default value on init
  if (init && isNewHistory) {
    dispatch(setStateValue(key, defaultValue));
    setInit(false);
  }

  // Navigating to an existing point in history, so restore the state
  if (hasHistory && !isNewHistory && value !== history.state[key]) {
    setValue(history.state[key]);
  }

  return [value, setValue, isNewHistory];
};

export default useHistoryState;
