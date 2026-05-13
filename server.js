// Custom Next.js server for Hostinger Business shared hosting (Node.js
// Selector / Passenger). The Selector launches this file and sets PORT
// for us — we just boot Next in production mode and forward requests.
//
// On a VPS you can ignore this file and use `pm2 start ecosystem.config.cjs`
// instead, which calls `next start` directly.

const { createServer } = require("http");
const next = require("next");

const port = parseInt(process.env.PORT ?? "3000", 10);
const hostname = process.env.HOST ?? "0.0.0.0";

const app = next({ dev: false, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(port, () => {
    console.log(`pacificnutra ready on http://${hostname}:${port}`);
  });
});
