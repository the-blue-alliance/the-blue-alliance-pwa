import React from "react";
import Error from "../pages/_error";

const notFoundError = () => {
  if (process.browser) {
    return <Error statusCode={404} />;
  }
  const err = new Error();
  err.code = "ENOENT";
  err.statusCode = 404;
  throw err;
};

export default notFoundError;
