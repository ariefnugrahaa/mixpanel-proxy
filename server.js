const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();

const app = express();
const mixpanelApiUrl = process.env.MIXPANEL_API;

app.use(
  "/mixpanel",
  createProxyMiddleware({
    target: mixpanelApiUrl,
    changeOrigin: true,
    pathRewrite: {
      "^/mixpanel": "",
    },
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
