module.exports = {
  collectCoverageFrom: ["./src/**/*.js"],
  globals: {
    __BUILD_TIME__: true,
    __GIT_HASH__: true,
    __TBA_API_AUTH_KEY__: true,
    __FIREBASE_CONFIG__: true,
    __STACKDRIVER_CONFIG__: true,
  },
  setupFiles: ["./config/jest/setup.js"],
  testPathIgnorePatterns: ["./.next/", "./node_modules/"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "./config/jest/assetsTransformer.js",
  },
};
