/* eslint-env jest */
import notFoundError from "./notFoundError";

describe("on server", () => {
  it("throws an error", () => {
    expect(() => notFoundError()).toThrow();
  });

  it("throws an error with correct error code and statusCode", () => {
    try {
      notFoundError();
    } catch (err) {
      expect(err.code).toBe("ENOENT");
      expect(err.statusCode).toBe(404);
    }
  });
});

describe("on client", () => {
  it("returns error page", () => {
    process.browser = true;
    const page = notFoundError();
    expect(page.props.statusCode).toBe(404);
  });
});
