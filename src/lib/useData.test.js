/* eslint-env jest */
import React from "react";
import PropTypes from "prop-types";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { fromJS } from "immutable";
import getOrCreateStore from "./store";
import useData from "./useData";

const store = getOrCreateStore(
  fromJS({
    models: {
      data: "testData",
      status: "testStatus",
    },
  })
);

const TestComponent = ({
  fetchStatusSelector,
  dataSelector,
  dataFetcher,
  refetchOnLoad,
}) => {
  const [data, fetchStatus, refetch] = useData(
    fetchStatusSelector,
    dataSelector,
    dataFetcher,
    refetchOnLoad
  );
  return (
    <>
      <button onClick={refetch} />
      <div id="data">{data}</div>
      <div id="fetchStatus">{fetchStatus}</div>
    </>
  );
};
TestComponent.propTypes = {
  fetchStatusSelector: PropTypes.func.isRequired,
  dataSelector: PropTypes.func.isRequired,
  dataFetcher: PropTypes.func.isRequired,
  refetchOnLoad: PropTypes.bool,
};

describe("refetch on load", () => {
  const fetchStatusSelector = jest.fn(state =>
    state.getIn(["models", "status"])
  );
  const dataSelector = jest.fn(state => state.getIn(["models", "data"]));
  const dataFetcher = jest.fn();
  const mounted = mount(
    <Provider store={store}>
      <TestComponent
        fetchStatusSelector={fetchStatusSelector}
        dataSelector={dataSelector}
        dataFetcher={dataFetcher}
        refetchOnLoad={true}
      />
    </Provider>
  );

  it("calls dataFetcher on load", () => {
    expect(dataFetcher.mock.calls.length).toBe(1);
  });

  it("calls dataFetcher on refresh", () => {
    mounted.find("button").simulate("click");
    expect(dataFetcher.mock.calls.length).toBe(2);
  });

  it("returns the correct data", () => {
    expect(mounted.find("#data").text()).toBe("testData");
  });

  it("returns the correct fetchStatus", () => {
    expect(mounted.find("#fetchStatus").text()).toBe("testStatus");
  });
});

describe("don't refetch on load", () => {
  const fetchStatusSelector = jest.fn(state =>
    state.getIn(["models", "status"])
  );
  const dataSelector = jest.fn(state => state.getIn(["models", "data"]));
  const dataFetcher = jest.fn();
  const mounted = mount(
    <Provider store={store}>
      <TestComponent
        fetchStatusSelector={fetchStatusSelector}
        dataSelector={dataSelector}
        dataFetcher={dataFetcher}
        refetchOnLoad={false}
      />
    </Provider>
  );

  it("doesnt call dataFetcher on load", () => {
    expect(dataFetcher.mock.calls.length).toBe(0);
  });

  it("calls dataFetcher on refresh", () => {
    mounted.find("button").simulate("click");
    expect(dataFetcher.mock.calls.length).toBe(1);
  });

  it("returns the correct data", () => {
    expect(mounted.find("#data").text()).toBe("testData");
  });

  it("returns the correct fetchStatus", () => {
    expect(mounted.find("#fetchStatus").text()).toBe("testStatus");
  });
});
