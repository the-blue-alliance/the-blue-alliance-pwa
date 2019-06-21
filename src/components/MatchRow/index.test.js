/* eslint-env jest */
import React from "react";
import { shallow } from "enzyme";
import { fromJS } from "immutable";
import Component from "./index.js";
import Match from "../../database/Match";

it("Renders without crashing", () => {
  const match = new Match(
    fromJS({
      actual_time: 1554071772,
      alliances: {
        blue: {
          dq_team_keys: [],
          score: 73,
          surrogate_team_keys: [],
          team_keys: ["frc5499", "frc254", "frc6418"],
        },
        red: {
          dq_team_keys: [],
          score: 62,
          surrogate_team_keys: [],
          team_keys: ["frc972", "frc604", "frc7308"],
        },
      },
      comp_level: "f",
      event_key: "2019casj",
      key: "2019casj_f1m1",
      match_number: 1,
      post_result_time: 1554071960,
      predicted_time: 1554071763,
      set_number: 1,
      time: 1554073920,
      videos: [
        {
          key: "te07nmARolk",
          type: "youtube",
        },
      ],
      winning_alliance: "blue",
    })
  );
  shallow(<Component eventKey={match.event_key} match={match} />);
});
