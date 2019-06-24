/* eslint-env jest */
import React from "react";
import { shallow } from "enzyme";
import Router from "next/router";
import Component from "./index.js";

// Mock timers
jest.useFakeTimers();

// Mock requestAnimationFrame
let rafs = [];
global.requestAnimationFrame = callback => {
  rafs.push(callback);
};
const runAllRafs = () => {
  for (let raf of rafs) {
    raf();
  }
  rafs = [];
};

// Intercept router change callbacks
let callbacks = {};
Router.events.on = jest.fn((event, callback) => {
  callbacks[event] = callback;
});
Router.events.off = jest.fn((event, callback) => {
  if (callbacks[event] === callback) {
    delete callbacks[event];
  }
});

const reset = () => {
  callbacks = {};
  rafs = [];
  jest.clearAllMocks();
  jest.clearAllTimers();
};

describe("standard usage", () => {
  beforeAll(reset);

  let wrapper;

  it("mounts and is not visible", () => {
    wrapper = shallow(<Component />);
    expect(wrapper.html()).toBe(null);
  });

  it("starts visible at 0%", () => {
    callbacks["routeChangeStart"]();
    jest.runAllTimers();
    runAllRafs();

    const { showProgress, value } = wrapper.state();
    expect(showProgress).toBe(true);
    expect(value).toBe(0);
  });

  it("increases value after some time", () => {
    jest.advanceTimersByTime(500);
    const { showProgress, value } = wrapper.state();
    expect(showProgress).toBe(true);
    expect(value).toBeGreaterThan(0);
    expect(value).toBeLessThan(1);
  });

  it("gets very close to 100% after a very long time", () => {
    jest.advanceTimersByTime(100000);
    const { showProgress, value } = wrapper.state();
    expect(showProgress).toBe(true);
    expect(value).toBeGreaterThan(0.9);
    expect(value).toBeLessThan(1);
  });

  it("finishes to 100%", () => {
    callbacks["routeChangeComplete"]();
    const { showProgress, value } = wrapper.state();
    expect(showProgress).toBe(true);
    expect(value).toBe(1);
  });

  it("hides and resets after some time", () => {
    jest.runAllTimers();
    const { showProgress, value } = wrapper.state();
    expect(showProgress).toBe(false);
    expect(value).toBe(0);
  });
});

describe("quick routeChangeComplete", () => {
  beforeAll(reset);

  let wrapper;

  it("mounts and is not visible", () => {
    wrapper = shallow(<Component />);
    expect(wrapper.html()).toBe(null);
  });

  it("starts invisible at 0%", () => {
    callbacks["routeChangeStart"]();
    jest.runAllTimers();

    const { showProgress, value } = wrapper.state();
    expect(showProgress).toBe(false);
    expect(value).toBe(0);
  });

  it("never shows on complete", () => {
    callbacks["routeChangeComplete"]();
    jest.runAllTimers();

    const { showProgress, value } = wrapper.state();
    expect(showProgress).toBe(false);
    expect(value).toBe(0);
  });
});

describe("complete before fully started", () => {
  beforeAll(reset);

  let wrapper;

  it("mounts and is not visible", () => {
    wrapper = shallow(<Component />);
    expect(wrapper.html()).toBe(null);
  });

  it("starts invisible at 0%", () => {
    callbacks["routeChangeStart"]();

    const { showProgress, value } = wrapper.state();
    expect(showProgress).toBe(false);
    expect(value).toBe(0);
  });

  it("never shows on complete", () => {
    callbacks["routeChangeComplete"]();
    jest.runAllTimers();

    const { showProgress, value } = wrapper.state();
    expect(showProgress).toBe(false);
    expect(value).toBe(0);
  });
});

describe("in case of error", () => {
  beforeAll(reset);

  let wrapper;

  it("mounts and is not visible", () => {
    wrapper = shallow(<Component />);
    expect(wrapper.html()).toBe(null);
  });

  it("starts visible at 0%", () => {
    callbacks["routeChangeStart"]();
    jest.runAllTimers();
    runAllRafs();

    const { showProgress, value } = wrapper.state();
    expect(showProgress).toBe(true);
    expect(value).toBe(0);
  });

  it("hides and resets on error", () => {
    callbacks["routeChangeError"]();
    const { showProgress, value } = wrapper.state();
    expect(showProgress).toBe(false);
    expect(value).toBe(0);
  });
});

describe("on mount/unmount", () => {
  beforeAll(reset);

  let wrapper;

  it("registers callbacks", () => {
    wrapper = shallow(<Component />);
    expect(typeof callbacks["routeChangeStart"]).toBe("function");
    expect(typeof callbacks["routeChangeComplete"]).toBe("function");
    expect(typeof callbacks["routeChangeError"]).toBe("function");
  });

  it("unregisters callbacks", () => {
    wrapper.unmount();
    expect(typeof callbacks["routeChangeStart"]).toBe("undefined");
    expect(typeof callbacks["routeChangeComplete"]).toBe("undefined");
    expect(typeof callbacks["routeChangeError"]).toBe("undefined");
  });
});
