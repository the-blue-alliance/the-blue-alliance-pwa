const express = require("express");
const next = require("next");
const compression = require("compression");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dir: "./src", dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(compression());
  server.use(express.static("public"));

  // Map clean URLs
  server.get("/event/:eventKey", (req, res) => {
    return app.render(req, res, "/event", { eventKey: req.params.eventKey });
  });
  server.get("/events/:year", (req, res) => {
    return app.render(req, res, "/events", { year: req.params.year });
  });
  // server.get('/match/:matchKey', (req, res) => {
  //   return app.render(req, res, '/match', { matchKey: req.params.matchKey })
  // })

  // The rest
  server.get("*", (req, res) => handle(req, res));

  server.listen(port, err => {
    if (err) throw err;
    if (dev) console.log(`> Ready on http://localhost:${port}`);
  });
});
