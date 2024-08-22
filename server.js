const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();

const app = express();
const mixpanelApiUrl = process.env.MIXPANEL_API;

const proxy = createProxyMiddleware({
  target: mixpanelApiUrl,
  changeOrigin: true,
  pathRewrite: {
    "^/analytics/track": "",
  },
  onProxyReq: (proxyReq, req, res) => {},
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
    res.setHeader("Access-Control-Allow-Credentials", "true");
  },
});

app.use("/", proxy);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {});
