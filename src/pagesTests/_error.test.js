/* eslint-env jest */
import React from "react";
import { shallow } from "enzyme";
import Error from "../pages/_error.js";

it("Renders 404 without crashing", () => {
  shallow(<Error statusCode={404} />);
});

it("Renders 500 without crashing", () => {
  shallow(<Error statusCode={500} />);
});
