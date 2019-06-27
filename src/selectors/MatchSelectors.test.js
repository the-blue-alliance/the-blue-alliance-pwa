/* eslint-env jest */
import { fromJS } from "immutable";
import getOrCreateStore from "../lib/store";
import { getEventMatches, getMatch } from "./MatchSelectors";
import Match from "../database/Match";

const state = getOrCreateStore(
  fromJS({
    models: {
      matches: {
        byKey: {
          "2019casj_qm1": { key: "2019casj_qm1" },
          "2019casj_qm2": { key: "2019casj_qm2" },
        },
        collections: {
          byEvent: { "2019casj": ["2019casj_qm1", "2019casj_qm2"] },
        },
      },
    },
  })
).getState();

it("selects correct Match", () => {
  const event = getMatch(state, "2019casj_qm1");
  expect(event).toBeInstanceOf(Match);
  expect(event.key).toBe("2019casj_qm1");
});

it("selects correct eventMatches", () => {
  const eventMatches = getEventMatches(state, "2019casj");
  eventMatches.forEach(match => {
    expect(match).toBeInstanceOf(Match);
  });
  expect(eventMatches.size).toBe(2);
});
