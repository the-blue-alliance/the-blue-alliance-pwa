/* eslint-env jest */
import React from "react";
import { shallow } from "enzyme";
import Match from "../pages/match.js";

it("Renders without crashing", () => {
  shallow(<Match />);
});
