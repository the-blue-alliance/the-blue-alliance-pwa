/* eslint-env jest */
import React from "react";
import { shallow } from "enzyme";
import Component from "./index.js";
import mockNextUseRouter from "../../lib/mockNextUseRouter";

it("Renders without crashing", () => {
  mockNextUseRouter({ query: {} });
  shallow(<Component events={[]} />);
});
