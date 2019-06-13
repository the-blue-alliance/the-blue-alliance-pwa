import StackdriverErrorReporter from "stackdriver-errors-js";
import { isClient } from "../lib/utils";

let errorReporter = { report: console.error };
if (process.env.NODE_ENV === "production" && isClient) {
  errorReporter = new StackdriverErrorReporter();
  errorReporter.start(__STACKDRIVER_CONFIG__);
}

export default errorReporter;
