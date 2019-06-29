import * as firebase from "firebase/app";
import * as gtag from "../lib/gtag";
import { isProd } from "./utils";
import Router from "next/router";

// Import Performance Monitoring on client only
if (process.browser) {
  require("firebase/performance");
}
// Initialize Firebase if not already initialized
if (firebase.apps.length === 0) {
  firebase.initializeApp(__FIREBASE_CONFIG__);
  // Initialize Performance Monitoring on client only
  if (isProd && process.browser) {
    firebase.performance();
  }
}

// Track Google Analytics pageviews
if (isProd) {
  Router.events.on("routeChangeComplete", url => gtag.pageview(url));
}

// Next.js clobbers history state on history.replaceState
// Wrap history.replaceState to never clobber state
if (typeof history !== "undefined") {
  const wrap = fn => (state, title, url) =>
    fn.call(history, Object.assign({}, history.state, state || {}), title, url);
  history.replaceState = wrap(history.replaceState);
}
