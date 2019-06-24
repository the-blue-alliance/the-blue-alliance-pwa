/* eslint-env jest */
import React from "react";
import PropTypes from "prop-types";
import { mount } from "enzyme";
import { fromJS } from "immutable";
import withReduxStore from "./withReduxStore";

const App = ({ reduxStore }) => {
  return <div>{reduxStore.getState().getIn(["app", "testKey"])}</div>;
};
App.getInitialProps = jest.fn();
App.propTypes = {
  reduxStore: PropTypes.object,
};
const AppWithRedux = withReduxStore(App);

const mounted = mount(
  <AppWithRedux
    initialReduxState={fromJS({
      app: {
        testKey: "test",
      },
    })}
  />
);

it("calls getInitialProps of wrapped component", async () => {
  const appContext = { ctx: {} };
  await AppWithRedux.getInitialProps(appContext);
  expect(App.getInitialProps.mock.calls.length).toBe(1);
});

it("creates store with given initialState and passes store to wrapped component", () => {
  expect(mounted.find("div").text()).toBe("test");
});
