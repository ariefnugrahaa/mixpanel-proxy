const { createProxyMiddleware } = require("http-proxy-middleware");

const mixpanelApiUrl = process.env.MIXPANEL_API;

const proxy = createProxyMiddleware({
  target: mixpanelApiUrl,
  changeOrigin: true,
  pathRewrite: {
    "^/api/mixpanel": "", // Sesuaikan dengan rute API di Vercel
  },
  onProxyReq: (proxyReq, req, res) => {
    console.log("Proxying request to:", proxyReq.path);
  },
  onProxyRes: (proxyRes, req, res) => {
    console.log("Proxy response headers:", proxyRes.headers);
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
});

export default function handler(req, res) {
  console.log("Received request:", req.method, req.url);
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.status(200).end();
    return;
  }

  return proxy(req, res);
}
