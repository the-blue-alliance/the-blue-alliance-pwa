const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});

module.exports = withBundleAnalyzer({
  // Build one level up from ./src
  distDir: "../.next",
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
