/* eslint-env jest */
import React from "react";
import { Provider } from "react-redux";
import { RouterContext } from "next-server/dist/lib/router-context";
import { mount } from "enzyme";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";
import getOrCreateStore from "../lib/store";
import Events from "../pages/events.js";

const reduxStore = getOrCreateStore();
mockAllIsIntersecting(true);

it("Renders without crashing", async () => {
  const router = {
    pathname: "/events",
    route: "/events",
    query: { year: 2019 },
    asPath: "/events",
  };

  const { ...initialProps } = await Events.getInitialProps({
    reduxStore,
    query: router.query,
  });

  mount(
    <RouterContext.Provider value={router}>
      <Provider store={reduxStore}>
        <Events {...initialProps} />
      </Provider>
    </RouterContext.Provider>
  );
});
