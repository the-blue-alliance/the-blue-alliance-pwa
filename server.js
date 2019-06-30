const dev = process.env.NODE_ENV !== "production";
const tracer = require("@google-cloud/trace-agent").start({
  enabled: !dev,
});
const { join } = require("path");
const express = require("express");
const next = require("next");
const compression = require("compression");
const LRUCache = require("lru-cache");

const port = parseInt(process.env.PORT, 10) || (dev ? 3000 : 3001);
const app = next({ dir: "./src", dev });
const handle = app.getRequestHandler();

// Prepare LRU cache
const cache = new LRUCache({
  length: function(n, key) {
    return n.toString().length + key.toString().length;
  },
  max: 50 * 1e6, // ~50MB cache soft limit
  maxAge: 60 * 1e3, // 1 min
});

const renderAndCache = async (req, res, pagePath, queryParams) => {
  const cacheKey = req.url;

  // If a page is cached, serve it
  if (!dev && cache.has(cacheKey)) {
    res.setHeader("x-ssr-cache", "HIT");
    res.send(cache.get(cacheKey));
    logCacheInfo(true);
    return;
  }

  try {
    // If not, render the page into HTML
    const span = tracer.createChildSpan({ name: "renderToHTML" });
    const html = await app.renderToHTML(req, res, pagePath, queryParams);
    span.endSpan();
    // Something is wrong with the request, skip cache
    if (res.statusCode !== 200) {
      res.send(html);
      return;
    }
    // Cache and send this page
    cache.set(cacheKey, html);
    res.setHeader("x-ssr-cache", "MISS");
    res.setHeader("cache-control", "public, max-age=61");
    res.send(html);
    logCacheInfo(false);
  } catch (err) {
    app.renderError(err, req, res, pagePath, queryParams);
  }
};

let hits = 0;
let total = 0;
const logCacheInfo = hit => {
  total++;
  if (hit) hits++;
  if (!dev) {
    // eslint-disable-next-line no-console
    console.log(
      `[CACHE] ${hit ? "HIT" : "MISS"} (${hits}/${total}: ${(
        (100 * hits) /
        total
      ).toFixed(1)}%) (count: ${cache.itemCount}, size: ${(
        cache.length / 1e6
      ).toFixed(2)}MB)`
    );
  }
};

app.prepare().then(() => {
  const server = express();
  server.use(compression());
  server.use(express.static("public"));

  // handle GET request to service worker /service-worker.js
  server.get("/service-worker.js", (req, res) => {
    const filePath = join(__dirname, ".next", "/service-worker.js");
    app.serveStatic(req, res, filePath);
  });

  // Map clean URLs and cache results
  server.get("/event/:eventKey", (req, res) => {
    renderAndCache(req, res, "/event", {
      eventKey: req.params.eventKey,
    });
  });
  server.get("/events/:year", (req, res) => {
    renderAndCache(req, res, "/events", { year: req.params.year });
  });
  server.get("/events", (req, res) => {
    renderAndCache(req, res, "/events");
  });

  server.get("/team/:teamKey/:year", (req, res) => {
    renderAndCache(req, res, "/team", {
      teamKey: req.params.teamKey,
      year: req.params.year,
    });
  });
  server.get("/team/:teamKey", (req, res) => {
    renderAndCache(req, res, "/team", { teamKey: req.params.teamKey });
  });
  server.get("/teams", (req, res) => {
    renderAndCache(req, res, "/teams", req.query);
  });

  server.get("/match/:matchKey", (req, res) => {
    return renderAndCache(req, res, "/match", {
      matchKey: req.params.matchKey,
    });
  });

  server.get("/", (req, res) => {
    renderAndCache(req, res, "/");
  });

  // The rest
  server.get("*", (req, res) => handle(req, res));

  server.listen(port, err => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    if (dev) console.log(`> Ready on http://localhost:${port}`);
  });
});
