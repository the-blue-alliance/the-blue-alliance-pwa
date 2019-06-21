import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import indigo from "@material-ui/core/colors/indigo";
import { GA_TRACKING_ID } from "../../lib/gtag";

const PageHead = () => {
  const router = useRouter();
  const canonicalUrl = `https://www.thebluealliance.com${router.asPath}`;
  return (
    <Head>
      <meta charSet="utf-8" />
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_TRACKING_ID}');`,
        }}
      />
      <link rel="manifest" href="/manifest.json" />
      {/* Use minimum-scale=1 to enable GPU rasterization */}
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
      />
      {/* PWA primary color */}
      <meta name="theme-color" content={indigo["500"]} />
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
        crossOrigin="anonymous"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        rel="preconnect"
        href="https://firebaseinstallations.googleapis.com"
        crossOrigin="anonymous"
      />
      <link rel="preconnect" href="https://storage.googleapis.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      {/* Measure first input delay: https://github.com/GoogleChromeLabs/first-input-delay */}
      <script
        dangerouslySetInnerHTML={{
          __html: `!function(n,e){var t,o,i,c=[],f={passive:!0,capture:!0},r=new Date,a="pointerup",u="pointercancel";function p(n,c){t||(t=c,o=n,i=new Date,w(e),s())}function s(){o>=0&&o<i-r&&(c.forEach(function(n){n(o,t)}),c=[])}function l(t){if(t.cancelable){var o=(t.timeStamp>1e12?new Date:performance.now())-t.timeStamp;"pointerdown"==t.type?function(t,o){function i(){p(t,o),r()}function c(){r()}function r(){e(a,i,f),e(u,c,f)}n(a,i,f),n(u,c,f)}(o,t):p(o,t)}}function w(n){["click","mousedown","keydown","touchstart","pointerdown"].forEach(function(e){n(e,l,f)})}w(n),self.perfMetrics=self.perfMetrics||{},self.perfMetrics.onFirstInputDelay=function(n){c.push(n),s()}}(addEventListener,removeEventListener);`,
        }}
      />
      {/* Other common headers */}
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="The Blue Alliance" />
      <link rel="shortcut icon" href="/favicon.ico" />
    </Head>
  );
};

export default React.memo(PageHead);
