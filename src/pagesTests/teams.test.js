/* eslint-env jest */
import React from "react";
import { Provider } from "react-redux";
import { fromJS } from "immutable";
import { mount } from "enzyme";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";
import getOrCreateStore from "../lib/store";
import mockNextUseRouter from "../lib/mockNextUseRouter";
import Teams from "../pages/teams.js";

const reduxStore = getOrCreateStore(
  fromJS({
    apiStatus: {
      max_teams_page: 1,
    },
  })
);
mockAllIsIntersecting(true);

it("Renders without crashing", async () => {
  const router = {
    pathname: "/teams",
    route: "/teams",
    query: {},
    asPath: "/teams",
  };
  mockNextUseRouter(router);

  const { ...initialProps } = await Teams.getInitialProps({
    reduxStore,
    query: router.query,
  });

  mount(
    <Provider store={reduxStore}>
      <Teams {...initialProps} />
    </Provider>
  );
});
