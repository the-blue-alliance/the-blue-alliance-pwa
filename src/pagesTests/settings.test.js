/* eslint-env jest */
import React from "react";
import { shallow } from "enzyme";
import Settings from "../pages/settings.js";

it("Renders without crashing", () => {
  shallow(<Settings />);
});
