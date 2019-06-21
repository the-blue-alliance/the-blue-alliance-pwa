/* eslint-env jest */
import { fromJS } from "immutable";
import Event from "./Event";
import { newEvent } from "../reducers/tests/data/event"; // TODO: Don't use test data from here

describe("Event record", () => {
  describe("typical model", () => {
    const event = new Event(fromJS(newEvent));

    it("has correct safeShortName", () => {
      expect(event.safeShortName()).toEqual("Silicon Valley");
    });

    it("has correct cityStateCountry", () => {
      expect(event.getCityStateCountry()).toEqual("San Jose, CA, USA");
      // Check for proper caching
      expect(event.cityStateCountry).toEqual("San Jose, CA, USA");
      expect(event.getCityStateCountry()).toEqual("San Jose, CA, USA");
    });

    it("has correct isRegional", () => {
      expect(event.isRegional()).toBe(true);
    });
  });

  describe("null model", () => {
    // Tests minimally populated Event
    const event = new Event(
      fromJS({
        name: "Silicon Valley Regional",
      })
    );

    it("has correct safeShortName", () => {
      expect(event.safeShortName()).toEqual("Silicon Valley Regional");
    });

    it("has correct cityStateCountry", () => {
      expect(event.getCityStateCountry()).toBe(null);
      // Check for proper caching
      expect(event.cityStateCountry).toEqual(null);
      expect(event.getCityStateCountry()).toEqual(null);
    });
  });
});
