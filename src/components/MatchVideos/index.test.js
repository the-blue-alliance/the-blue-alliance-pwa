/* eslint-env jest */
import React from "react";
import { shallow } from "enzyme";
import { fromJS } from "immutable";
import Component from "./index.js";
import Match from "../../database/Match";
import Event from "../../database/Event";
import { newMatch } from "../../reducers/tests/data/match";
import { newEvent } from "../../reducers/tests/data/event";

it("Renders without crashing", () => {
  const match = new Match(fromJS(newMatch));
  const event = new Event(fromJS(newEvent));
  shallow(<Component match={match} event={event} />);
});
