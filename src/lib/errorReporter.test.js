/* eslint-env jest */
import errorReporter from "./errorReporter";

it("returns a reportable object", () => {
  expect(typeof errorReporter.report).toBe("function");
});
