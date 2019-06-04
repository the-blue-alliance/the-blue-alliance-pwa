/* eslint-env jest */
import React from "react";
import { shallow } from "enzyme";
import App from "../pages/index.js";

it("Renders without crashing", () => {
  shallow(<App />);
});
