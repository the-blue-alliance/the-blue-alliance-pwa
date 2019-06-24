/* eslint-env jest */
import React from "react";
import { mount } from "enzyme";
import useSearchFocus from "./useSearchFocus";

const TestComponent = () => {
  const searchRef = useSearchFocus();
  return <input ref={searchRef} />;
};

// Intercept addEventListener and removeEventListener
const eventMap = {};
window.addEventListener = jest.fn((event, cb) => {
  eventMap[event] = cb;
});
window.removeEventListener = jest.fn((event, cb) => {
  if (eventMap[event] === cb) {
    delete eventMap[event];
  }
});

const mounted = mount(<TestComponent />);

it("registers a keydown event listener", () => {
  expect(typeof eventMap.keydown).toBe("function");
});

it("starts without focus", () => {
  expect(mounted.find("input").is(":focus")).toBe(false);
});

it("doesn't focus on a random key press", () => {
  eventMap.keydown({ keyCode: 1, preventDefault: () => null });
  expect(mounted.find("input").is(":focus")).toBe(false);
});

it("takes focus when F3 is pressed", () => {
  eventMap.keydown({ keyCode: 114, preventDefault: () => null });
  expect(mounted.find("input").is(":focus")).toBe(true);
});

it("removes focus when Esc is pressed", () => {
  eventMap.keydown({ keyCode: 27, preventDefault: () => null });
  expect(mounted.find("input").is(":focus")).toBe(false);
});

it("takes focus when ctrl+F is pressed", () => {
  eventMap.keydown({ ctrlKey: true, keyCode: 70, preventDefault: () => null });
  expect(mounted.find("input").is(":focus")).toBe(true);
});

it("doesn't remove focus on a random key press", () => {
  eventMap.keydown({ keyCode: 1, preventDefault: () => null });
  expect(mounted.find("input").is(":focus")).toBe(true);
});

it("removes event listener when unmounted", () => {
  mounted.unmount();
  expect(typeof eventMap.keydown).toBe("undefined");
});
