/* eslint-env jest */
import React from "react";
import { shallow } from "enzyme";
import Teams from "../pages/teams.js";

it("Renders without crashing", () => {
  shallow(<Teams page={0} maxPage={100} teams={[]} />);
});
