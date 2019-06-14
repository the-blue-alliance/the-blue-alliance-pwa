import StackdriverErrorReporter from "stackdriver-errors-js";
import { isProd } from "../lib/utils";

// eslint-disable-next-line no-console
let errorReporter = { report: console.error };
if (isProd && process.browser) {
  errorReporter = new StackdriverErrorReporter();
  errorReporter.start(__STACKDRIVER_CONFIG__);
}

export default errorReporter;
