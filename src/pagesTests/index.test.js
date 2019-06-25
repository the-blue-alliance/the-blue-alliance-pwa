/* eslint-env jest */
import React from "react";
import { shallow } from "enzyme";
import Index from "../pages/index.js";

it("Renders without crashing", () => {
  shallow(<Index />);
});
