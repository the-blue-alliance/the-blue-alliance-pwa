/* eslint-env jest */
import React from "react";
import { shallow } from "enzyme";
import Component from "./index.js";
import Team from "../../database/Team";

it("Renders without crashing", () => {
  shallow(
    <Component
      team={
        new Team({
          // TODO: Use real data
          key: "frc604",
          name: "Sponsor 1, Sponsor 2",
          nickname: "Quixilver",
          location: "San Jose, CA, USA",
        })
      }
    />
  );
});
