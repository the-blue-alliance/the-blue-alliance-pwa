import { Map } from "immutable";

// TODO: Don't hardcode
export const defaultState = Map({
  max_season: 2019,
  max_teams_page: 16,
});

const apiStatus = (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
export default apiStatus;
