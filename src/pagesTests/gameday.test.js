/* eslint-env jest */
import React from "react";
import { shallow } from "enzyme";
import GameDay from "../pages/gameday.js";

it("Renders without crashing", () => {
  shallow(<GameDay />);
});
