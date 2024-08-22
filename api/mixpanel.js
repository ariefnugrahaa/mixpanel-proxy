const { createProxyMiddleware } = require("http-proxy-middleware");

const mixpanelApiUrl = "https://api.mixpanel.com";

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
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://staging.graveltechnology.com"
    );
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

export default function handler(req, res) {
  console.log("Received request:", req.method, req.url);
  console.log("Request headers:", req.headers);

  // Handle preflight request
  if (req.method === "OPTIONS") {
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://staging.graveltechnology.com"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.status(200).end();
    return;
  }

  return proxy(req, res, (err) => {
    if (err) {
      console.error("Proxy error:", err);
      res.status(500).json({ error: "Proxy error", details: err.message });
    }
  });
}
