/** @type {import('next').NextConfig} */
const nextConfig = {
  // Deployed via the custom server in `server.js` (Hostinger's Node.js
  // Selector runs `node server.js`). A custom server needs a normal
  // build — do NOT set `output: "standalone"` here. Standalone output is
  // incompatible with a custom server and stops `/_next/static` assets
  // (the CSS and JS bundles) from being served, which renders the site
  // unstyled.

  // Limit build parallelism to reduce peak RAM on constrained hosting.
  // Without this, webpack spawns as many workers as CPU cores, which
  // can push memory usage over the limit mid-build.
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
};

export default nextConfig;
