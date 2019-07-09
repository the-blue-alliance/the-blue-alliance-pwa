/* eslint-env jest */
import { fromJS, Map, Set } from "immutable";
import getOrCreateStore from "./store";

import Event from "../database/Event";
import Match from "../database/Match";
import Team from "../database/Team";

const defaultState = fromJS({
  apiStatus: {
    max_season: 2019,
    max_teams_page: 16,
  },
  app: {
    historyState: {},
    darkTheme: false,
  },
  models: {},
});

const initialState = fromJS({
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
    teams: {
      byKey: {
        frc254: {},
        frc604: {},
      },
      collections: {
        all: ["frc254", "frc604"],
        byEvent: { "2019casj": ["frc254", "frc604"] },
      },
    },
  },
});

// The expected typed conversion of initialState
const typedInitialState = fromJS({
  models: {
    events: {
      byKey: {
        "2019casj": new Event({}),
        "2019casf": new Event({}),
      },
      collections: { byYear: { "2019": new Set(["2019casf", "2019casj"]) } },
    },
    matches: {
      byKey: {
        "2019casj_qm1": new Match({}),
        "2019casj_qm2": new Match({}),
      },
      collections: {
        byEvent: { "2019casj": new Set(["2019casj_qm1", "2019casj_qm2"]) },
        byTeamYear: {
          frc254: {
            "2019": new Set(["2019casj_qm1", "2019casj_qm2"]),
          },
        },
      },
    },
    teams: {
      byKey: {
        frc254: new Team({}),
        frc604: new Team({}),
      },
      collections: {
        all: new Set(["frc254", "frc604"]),
        byEvent: { "2019casj": new Set(["frc254", "frc604"]) },
      },
    },
  },
});

const runTests = isServer => {
  describe(`on the ${isServer ? "server" : "client"}`, () => {
    beforeEach(() => {
      // Isolate tests
      delete window["__NEXT_REDUX_STORE__"];
      process.browser = !isServer;
    });

    describe("without a given initial state", () => {
      it("has the expected default state", () => {
        const store = getOrCreateStore();
        expect(store.getState()).toEqual(defaultState);
      });

      if (isServer) {
        it("returns a different store object", () => {
          const store = getOrCreateStore();
          expect(store).not.toBe(getOrCreateStore());
        });
      } else {
        it("returns the same store object", () => {
          const store = getOrCreateStore();
          expect(store).toBe(getOrCreateStore());
        });
      }
    });

    it("works with an incomplete initial state", () => {
      const state = getOrCreateStore(
        fromJS({
          app: {},
        })
      ).getState();
      expect(state).toBeInstanceOf(Map);
    });

    const runTypeTests = isTyped => {
      describe(`with ${
        isTyped ? "typed" : "untyped"
      } initial state models`, () => {
        let is;
        if (isTyped) {
          is = typedInitialState;
        } else {
          is = initialState;
        }
        const state = getOrCreateStore(is).getState();
        it("converts models to correct types", () => {
          expect(state.get("models")).toEqual(typedInitialState.get("models"));
        });
      });
    };
    runTypeTests(false);
    runTypeTests(true);
  });
};

// Run server tests
runTests(true);
// Run client tests
runTests(false);
