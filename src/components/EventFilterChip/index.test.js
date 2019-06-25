/* eslint-env jest */
import React from "react";
import { mount } from "enzyme";
import Component from "./index.js";

it("Renders without crashing", () => {
  mount(<Component label="Test" color="#fff" />);
});

it("Renders selected without crashing", () => {
  mount(<Component label="Test" color="#fff" selected />);
});
