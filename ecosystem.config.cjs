// PM2 process file for running Pacific Nutra on a Hostinger VPS (or any
// Linux server). After `npm run build`, start with:
//   pm2 start ecosystem.config.cjs
//   pm2 save && pm2 startup
module.exports = {
  apps: [
    {
      name: "pacificnutra",
      script: "server.js",
      cwd: __dirname,
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
      },
      max_memory_restart: "512M",
    },
  ],
};
