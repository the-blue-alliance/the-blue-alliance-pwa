const child_process = require("child_process");
const withOffline = require("next-offline");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});

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
  webpack: (config, { dev, isServer, webpack }) => {
    // Add build info
    const buildTime = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York"
    });
    const gitHash =
      process.env.GITHUB_SHA ||
      child_process.execSync("git rev-parse HEAD").toString();
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

    // Configure vendor bundles
    // See: https://www.chrisclaxton.me.uk/chris-claxtons-blog/webpack-chunksplitting-deepdive
    // and https://hackernoon.com/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758
    if (!isServer) {
      config.optimization.splitChunks = {
        hidePathInfo: true,
        chunks: "all",
        maxInitialRequests: Infinity,
        maxAsyncRequests: Infinity,
        cacheGroups: {
          default: false, // disable the built-in groups, default & vendors (vendors is overwritten below)
          vendorSplit: {
            // split vendor node module into separate chunk if module is bigger than minSize
            chunks: "all",
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1];
              // npm package names are URL-safe, but some servers don't like @ symbols
              return `npm.${packageName.replace("@", "")}`;
            },
            priority: 2
          },
          vendors: {
            // picks up everything else being used from node_modules that is less than minSize
            chunks: "all",
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            priority: 1,
            enforce: true // create chunk regardless of the size of the chunk
          },
          commons: {
            // picks up everything else being shared
            chunks: "all",
            name: "commons",
            minChunks: 2,
            priority: 0,
            enforce: true // create chunk regardless of the size of the chunk
          }
        }
      };
    }

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
