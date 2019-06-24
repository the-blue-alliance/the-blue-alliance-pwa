/* eslint-env jest */
import { fromJS } from "immutable";
import getOrCreateStore from "../lib/store";
import { getYearEvents, getEvent } from "./EventSelectors";
import Event from "../database/Event";

const state = getOrCreateStore(
  fromJS({
    models: {
      events: {
        byKey: {
          "2019casf": { key: "2019casf" },
          "2019casj": { key: "2019casj" },
        },
        collections: { byYear: { "2019": ["2019casf", "2019casj"] } },
      },
    },
  })
).getState();

it("selects correct Event", () => {
  const event = getEvent(state, "2019casj");
  expect(event).toBeInstanceOf(Event);
  expect(event.key).toBe("2019casj");
});

it("selects correct yearEvents", () => {
  const yearEvents = getYearEvents(state, 2019);
  yearEvents.forEach(event => {
    expect(event).toBeInstanceOf(Event);
  });
  expect(yearEvents.size).toBe(2);
});
