/* eslint-env jest */
import { fromJS, Map, Set } from "immutable";
import getOrCreateStore from "./store";

import Event from "../database/Event";
import Match from "../database/Match";

const defaultState = fromJS({
  app: {
    darkTheme: false,
  },
  models: {},
});

beforeEach(() => {
  // Isolate tests
  delete window["__NEXT_REDUX_STORE__"];
});

describe("on the server", () => {
  describe("without a given initial state", () => {
    it("has the expected default state", () => {
      const store = getOrCreateStore();
      expect(store.getState()).toEqual(defaultState);
    });
  });
});

describe("on the client", () => {
  process.browser = true;

  describe("without a given initial state", () => {
    it("has the expected default state", () => {
      const store = getOrCreateStore();
      expect(store.getState()).toEqual(defaultState);
    });

    it("returns the same store object", () => {
      const store = getOrCreateStore();
      expect(store).toBe(getOrCreateStore());
    });
  });

  describe("with an incomplete initial state", () => {
    it("works", () => {
      const state = getOrCreateStore(
        fromJS({
          app: {},
        })
      ).getState();
      expect(state).toBeInstanceOf(Map);
    });
  });

  describe("with untyped initial state models", () => {
    const state = getOrCreateStore(
      fromJS({
        models: {
          events: {
            byKey: {
              "2019casj": {},
              "2019casf": {},
            },
            collections: { byYear: { "2019": ["2019casf", "2019casj"] } },
          },
          matches: {
            byKey: {
              "2019casj_qm1": {},
              "2019casj_qm2": {},
            },
            collections: {
              byEvent: { "2019casj": ["2019casj_qm1", "2019casj_qm2"] },
              byTeamYear: {
                frc254: {
                  "2019": ["2019casj_qm1", "2019casj_qm2"],
                },
              },
            },
          },
        },
      })
    ).getState();

    it("propery converts Event records", () => {
      expect(
        state.getIn(["models", "events", "byKey", "2019casj"])
      ).toBeInstanceOf(Event);
    });

    it("propery converts Match records", () => {
      expect(
        state.getIn(["models", "matches", "byKey", "2019casj_qm1"])
      ).toBeInstanceOf(Match);
    });

    it("propery converts collection Lists to Sets", () => {
      // 1 level deep
      expect(
        state.getIn(["models", "events", "collections", "byYear", "2019"])
      ).toBeInstanceOf(Set);
      expect(
        state.getIn(["models", "matches", "collections", "byEvent", "2019casj"])
      ).toBeInstanceOf(Set);

      // 2 level deep
      expect(
        state.getIn([
          "models",
          "matches",
          "collections",
          "byTeamYear",
          "frc254",
          "2019",
        ])
      ).toBeInstanceOf(Set);
    });
  });
});
