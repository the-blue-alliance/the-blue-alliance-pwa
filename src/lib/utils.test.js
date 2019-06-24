/* eslint-env jest */
import { isProd } from "./utils";

it("returns isProd", () => {
  expect(isProd).toBe(false);
});
