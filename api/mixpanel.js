// api/mixpanel.js
const { createProxyMiddleware } = require("http-proxy-middleware");

const mixpanelApiUrl = process.env.MIXPANEL_API;

const proxy = createProxyMiddleware({
  target: mixpanelApiUrl,
  changeOrigin: true,
  pathRewrite: {
    "^/api/mixpanel": "", // Sesuaikan dengan rute API di Vercel
  },
});

export default function handler(req, res) {
  return proxy(req, res);
}
