const child_process = require("child_process");
const withOffline = require("next-offline");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});

const buildTime = new Date().toLocaleString("en-US", {
  timeZone: "America/New_York"
});
const gitHash =
  process.env.GITHUB_SHA ||
  child_process.execSync("git rev-parse HEAD").toString();

const nextConfig = {
  // Build one level up from ./src
  distDir: "../.next",
  // Workbox
  workboxOpts: {
    clientsClaim: true,
    skipWaiting: true,
    globDirectory: "./public",
    globPatterns: ["**/*.{ico,json}"]
  },
  // Webpack
  webpack: (config, { dev, webpack }) => {
    // Add build info
    config.plugins.push(
      new webpack.DefinePlugin({
        __BUILD_TIME__: JSON.stringify(buildTime),
        __GIT_HASH__: JSON.stringify(gitHash)
      })
    );

    // Fixes npm packages that depend on `fs` module
    config.node = {
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
      config.module.rules.push({
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          emitWarning: true
        }
      });
    }

    return config;
  }
};

module.exports = withOffline(withBundleAnalyzer(nextConfig));
