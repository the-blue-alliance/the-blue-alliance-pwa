/* eslint-env jest */
import React from "react";
import { shallow } from "enzyme";
import Component from "./index.js";

it("Renders without crashing", () => {
  shallow(<Component years={[2020, 2019]} />);
});
