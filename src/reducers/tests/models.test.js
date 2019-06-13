/* eslint-env jest */
import { fromJS, Map, Set } from "immutable";
import * as types from "../../constants/ActionTypes";
import models from "../models";
import Event from "../../database/Event";
import { oldEvent, newEvent } from "./data/event";
import { events } from "./data/events";

describe("models reducer", () => {
  let state = models(undefined, {});

  it("defaults to an empty immutable Map", () => {
    expect(state).toEqual(new Map());
  });

  describe("single Event update", () => {
    it("sets an Event", () => {
      state = models(state, {
        type: types.FETCH_EVENT_SUCCESS,
        eventKey: "2019casj",
        data: oldEvent,
      });
      expect(state.getIn(["events", "byKey", "2019casj"])).toEqual(
        new Event(fromJS(oldEvent))
      );
    });

    it("returns the same Event object after a no-change update", () => {
      const event = state.getIn(["events", "byKey", "2019casj"]);
      state = models(state, {
        type: types.FETCH_EVENT_SUCCESS,
        eventKey: "2019casj",
        data: oldEvent,
      });
      expect(state.getIn(["events", "byKey", "2019casj"])).toBe(event);
    });

    it("returns a different Event object after an update", () => {
      const preUpdate = state.getIn(["events", "byKey", "2019casj"]);
      state = models(state, {
        type: types.FETCH_EVENT_SUCCESS,
        eventKey: "2019casj",
        data: newEvent,
      });
      const postUpdate = state.getIn(["events", "byKey", "2019casj"]);
      expect(postUpdate).not.toBe(preUpdate); // overall object should be different
      expect(postUpdate.address).not.toBe(preUpdate.address); // changed field should be different
      expect(postUpdate.city).toBe(preUpdate.city); // unchanged field should be the same
    });

    it("sets an Event after an update", () => {
      expect(state.getIn(["events", "byKey", "2019casj"])).toEqual(
        new Event(fromJS(newEvent))
      );
    });
  });

  describe("batch Event update", () => {
    it("returns the same Event object after a batch no-change update", () => {
      const preUpdate = state.getIn(["events", "byKey", "2019casj"]);
      state = models(state, {
        type: types.FETCH_YEAR_EVENTS_SUCCESS,
        year: 2019,
        data: events,
      });
      expect(state.getIn(["events", "byKey", "2019casj"])).toBe(preUpdate);
    });

    it("sets all Events in a batch update", () => {
      events.forEach(event => {
        expect(state.getIn(["events", "byKey", event.key])).toEqual(
          new Event(fromJS(event))
        );
      });
    });

    it("sets collection keys in a batch update", () => {
      expect(state.getIn(["events", "collections", "byYear", "2019"])).toEqual(
        new Set(events.map(event => event.key))
      );
    });
  });
});
