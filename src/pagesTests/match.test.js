/* eslint-env jest */
import React from "react";
import { Provider } from "react-redux";
import { RouterContext } from "next-server/dist/lib/router-context";
import { mount } from "enzyme";
import getOrCreateStore from "../lib/store";
import Match from "../pages/match.js";

const reduxStore = getOrCreateStore();

it("Renders without crashing", async () => {
  const router = {
    pathname: "/match",
    route: "/match",
    query: { matchKey: "2019casj_f1m1" },
    asPath: "/match",
  };

  const { ...initialProps } = await Match.getInitialProps({
    reduxStore,
    query: router.query,
  });

  mount(
    <RouterContext.Provider value={router}>
      <Provider store={reduxStore}>
        <Match {...initialProps} />
      </Provider>
    </RouterContext.Provider>
  );
});
