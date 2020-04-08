/* eslint-env jest */
import React from "react";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import getOrCreateStore from "../../lib/store";
import mockNextUseRouter from "../../lib/mockNextUseRouter";
import Component from "./index.js";

const reduxStore = getOrCreateStore();

it("Renders without crashing", () => {
  const router = {
    pathname: "/",
    route: "/",
    query: {},
    asPath: "/",
  };
  mockNextUseRouter(router);

  mount(
    <Provider store={reduxStore}>
      <Component />
    </Provider>
  );
});
