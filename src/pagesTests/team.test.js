/* eslint-env jest */
import React from "react";
import { shallow } from "enzyme";
import Team from "../pages/team.js";

it("Renders without crashing", () => {
  shallow(<Team />);
});
