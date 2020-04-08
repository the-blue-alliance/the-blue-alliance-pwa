/* eslint-env jest */
import React from "react";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";
import getOrCreateStore from "../lib/store";
import mockNextUseRouter from "../lib/mockNextUseRouter";
import Event from "../pages/event.js";

const reduxStore = getOrCreateStore();
mockAllIsIntersecting(true);

it("Renders without crashing", async () => {
  const router = {
    pathname: "/event",
    route: "/event",
    query: { eventKey: "2019casj" },
    asPath: "/event",
  };
  mockNextUseRouter(router);

  const { ...initialProps } = await Event.getInitialProps({
    reduxStore,
    query: router.query,
  });

  mount(
    <Provider store={reduxStore}>
      <Event {...initialProps} />
    </Provider>
  );
});
