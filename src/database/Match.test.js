/* eslint-env jest */
import { fromJS } from "immutable";
import Match from "./Match";

describe("Match record", () => {
  // TODO: store test data elsewhere
  const match_sf2m1 = new Match(
    fromJS({
      actual_time: 1554069056,
      alliances: {
        blue: {
          dq_team_keys: [],
          score: 78,
          surrogate_team_keys: [],
          team_keys: ["frc8", "frc1868", "frc4990"],
        },
        red: {
          dq_team_keys: [],
          score: 84,
          surrogate_team_keys: [],
          team_keys: ["frc5499", "frc254", "frc6418"],
        },
      },
      comp_level: "sf",
      event_key: "2019casj",
      key: "2019casj_sf2m1",
      match_number: 1,
      post_result_time: 1554069233,
      predicted_time: 1554069007,
      set_number: 2,
      time: 1554071220,
      videos: [
        {
          key: "z0IuZy_pM34",
          type: "youtube",
        },
      ],
      winning_alliance: "red",
    })
  );

  const match_f1m1 = new Match(
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

  it("has correct displayName for semifinals matches", () => {
    expect(match_sf2m1.getDisplayName()).toEqual("Semis 2 Match 1");
  });

  it("has correct short displayName for semifinals matches", () => {
    expect(match_sf2m1.getDisplayName(true)).toEqual("Semis 2\u00A0-\u00A01");
  });

  it("has correct displayName for finals matches", () => {
    expect(match_f1m1.getDisplayName()).toEqual("Finals 1");
  });

  it("has correct short displayName for finals matches", () => {
    expect(match_f1m1.getDisplayName(true)).toEqual("Finals 1");
  });
});
