/* eslint-env jest */
import React from "react";
import { mount } from "enzyme";
import mockNextUseRouter from "../../lib/mockNextUseRouter";
import Component from "./index.js";
import DarkModeContext from "../ThemeProvider/DarkModeContext";

it("Renders without crashing", () => {
  const router = {
    pathname: "/",
    route: "/",
    query: {},
    asPath: "/",
  };
  mockNextUseRouter(router);

  mount(
    <DarkModeContext.Provider value={{ isDark: false }}>
      <Component />
    </DarkModeContext.Provider>
  );
});
