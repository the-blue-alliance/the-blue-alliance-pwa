/* eslint-env jest */
import React from "react";
import { mount } from "enzyme";
import { useTheme } from "@material-ui/styles";
import ThemeProvider from "./index.js";

// Create test component that uses the theme
const ref = React.createRef();
const text = () => ref.current.textContent;
const Test = () => {
  const theme = useTheme();
  return <div ref={ref}>{theme.palette.type}</div>;
};

it("Has the correct default theme", () => {
  mount(
    <ThemeProvider>
      <Test />
    </ThemeProvider>
  );

  expect(text()).toEqual("light");
});
