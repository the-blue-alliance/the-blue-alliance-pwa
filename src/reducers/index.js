import { combineReducers } from "redux-immutable";

import app from "./app";
import models from "./models";

export default () =>
  combineReducers({
    app,
    models
  });
