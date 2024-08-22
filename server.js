const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();

const app = express();
const mixpanelApiUrl = "https://api.mixpanel.com";

app.use(
  "/api/mixpanel",
  createProxyMiddleware({
    target: mixpanelApiUrl,
    changeOrigin: true,
    pathRewrite: {
      "^/api/mixpanel": "", // Sesuaikan dengan rute API di lokal
    },
    onProxyRes: (proxyRes, req, res) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
    },
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
