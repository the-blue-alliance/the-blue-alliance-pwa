/* eslint-env jest */
import React from "react";
import { shallow } from "enzyme";
import Component from "./index.js";
import { newEvent } from "../../reducers/tests/data/event"; // TODO: Don't use test data from here
import Event from "../../database/Event";

const event = new Event(newEvent);

it("Renders without crashing", () => {
  shallow(<Component event={event} />);
});
