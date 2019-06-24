/* eslint-env jest */
import getOrCreateStore from "../lib/store";
import { fetchYearEvents, fetchEvent, fetchEventMatches } from "./index";

const store = getOrCreateStore();

const runTest = (name, successFn, successSelector, errorFn, errorSelector) => {
  describe(name, () => {
    describe("successful fetch", () => {
      let promise;

      it("sets the status as fetching", () => {
        promise = store.dispatch(successFn());
        expect(store.getState().getIn(successSelector)).toBe("fetching");
      });

      it("sets the status as success", async () => {
        await promise;
        expect(store.getState().getIn(successSelector)).toBe("success");
      });
    });

    describe("unsuccessful fetch", () => {
      let promise;

      it("sets the status as fetching", () => {
        promise = store.dispatch(errorFn());
        expect(store.getState().getIn(errorSelector)).toBe("fetching");
      });

      it("sets the status as success", async () => {
        await promise;
        expect(store.getState().getIn(errorSelector)).toBe("error");
      });
    });
  });
};

runTest(
  "fetchYearEvents",
  () => fetchYearEvents(2019),
  ["models", "eventsStatus", "collections", "byYear", "2019"],
  () => fetchYearEvents(0),
  ["models", "eventsStatus", "collections", "byYear", "0"]
);
runTest(
  "fetchEvent",
  () => fetchEvent("2019casj"),
  ["models", "eventsStatus", "byKey", "2019casj"],
  () => fetchEvent("2019fake"),
  ["models", "eventsStatus", "byKey", "2019fake"]
);
runTest(
  "fetchEventMatches",
  () => fetchEventMatches("2019casj"),
  ["models", "matchesStatus", "collections", "byEvent", "2019casj"],
  () => fetchEventMatches("2019fake"),
  ["models", "matchesStatus", "collections", "byEvent", "2019fake"]
);
