/* eslint-env jest */
import React from "react";
import { shallow } from "enzyme";
import MyTBA from "../pages/mytba.js";

it("Renders without crashing", () => {
  shallow(<MyTBA />);
});
