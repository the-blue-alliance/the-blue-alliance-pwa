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

if (isProd) {
  Router.events.on("routeChangeComplete", url => gtag.pageview(url));
}
