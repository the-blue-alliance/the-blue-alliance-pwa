const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");

module.exports = withBundleAnalyzer({
  // Build one level up from ./src
  distDir: "../.next",
  // Bundle size analyzer
  analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: "static",
      reportFilename: "../../.bundles/server.html"
    },
    browser: {
      analyzerMode: "static",
      reportFilename: "../.bundles/client.html"
    }
  },
  // Webpack
  webpack: (config, { dev }) => {
    const newConfig = config;

    // Fixes npm packages that depend on `fs` module
    newConfig.node = {
      fs: "empty"
    };

    // Hash static assets
    config.module.rules.push({
      test: /\.(txt|jpg|png|svg)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            context: "",
            outputPath: "static",
            publicPath: "/_next/static",
            name: "[path][name].[hash].[ext]"
          }
        }
      ]
    });

    // Setup eslint on dev
    if (dev) {
      newConfig.module.rules.push({
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          emitWarning: true
        }
      });
    }

    return newConfig;
  }
});
