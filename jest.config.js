module.exports = {
  collectCoverageFrom: ["./src/**/*.js"],
  setupFiles: ["./config/jest/setup.js"],
  testPathIgnorePatterns: ["./.next/", "./node_modules/"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "./config/jest/assetsTransformer.js",
  },
};
