/* eslint-env jest */
const fetch = url => {
  // Convert URL to mock data path
  const path = url.replace(
    "https://www.thebluealliance.com/api/v3",
    "./testdata/TBAv3"
  );

  let data;
  let ok;
  let statusText;
  try {
    data = require(path).default;
    ok = true;
    statusText = "OK";
  } catch {
    data = null;
    ok = false;
    statusText = "Not Found";
  }

  return new Promise(resolve =>
    resolve({
      ok,
      json: () => {
        return JSON.parse(data);
      },
      statusText,
    })
  );
};

module.exports = fetch;
