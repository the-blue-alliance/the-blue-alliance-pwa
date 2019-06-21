/* eslint-env jest */
import React from "react";
import { shallow } from "enzyme";
import Component from "./index.js";

it("Renders without crashing", () => {
  shallow(<Component metaDescription="This is a test!" />);
});
