/* eslint-env jest */
import React from "react";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import { RouterContext } from "next-server/dist/lib/router-context";
import getOrCreateStore from "../../lib/store";
import Component from "./index.js";

const reduxStore = getOrCreateStore();

it("Renders without crashing", () => {
  const router = {
    pathname: "/",
    route: "/",
    query: {},
    asPath: "/",
  };

  mount(
    <RouterContext.Provider value={router}>
      <Provider store={reduxStore}>
        <Component />
      </Provider>
    </RouterContext.Provider>
  );
});
