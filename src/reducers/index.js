import { combineReducers } from "redux-immutable";

import apiStatus from "./apiStatus";
import app from "./app";
import models from "./models";

export default () =>
  combineReducers({
    apiStatus,
    app,
    models,
  });
