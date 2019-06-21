/* eslint-env jest */
import React from "react";
import { shallow } from "enzyme";
import { Container } from "next/app";
import Component from "./index.js";

it("Renders without crashing", () => {
  shallow(
    <Container>
      <Component />
    </Container>
  );
});
