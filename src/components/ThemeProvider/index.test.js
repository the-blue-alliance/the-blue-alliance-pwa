/* eslint-env jest */
import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { useTheme } from "@material-ui/styles";
import initializeStore from "../../lib/store";
import ThemeProvider from "./index.js";
import { toggleTheme } from "../../actions";

const store = initializeStore();

// Create test component that uses the theme
const ref = React.createRef();
const text = () => ref.current.textContent;
const Test = () => {
  const theme = useTheme();
  return <div ref={ref}>{theme.palette.type}</div>;
};

it("Has the correct default theme", () => {
  mount(
    <Provider store={store}>
      <ThemeProvider>
        <Test />
      </ThemeProvider>
    </Provider>
  );

  expect(text()).toEqual("light");
});

it("Toggles to dark theme", () => {
  store.dispatch(toggleTheme());
  expect(text()).toEqual("dark");
});

it("Toggles to light theme", () => {
  store.dispatch(toggleTheme());
  expect(text()).toEqual("light");
});
