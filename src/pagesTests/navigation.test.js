/* eslint-env jest */
import React from "react";
import { shallow } from "enzyme";
import Navigation from "../pages/navigation.js";

it("Renders without crashing", () => {
  shallow(<Navigation />);
});
