import { createProxyMiddleware } from "http-proxy-middleware";
import cors from "cors";

const mixpanelApiUrl = process.env.MIXPANEL_API;

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],
};

const proxy = createProxyMiddleware({
  target: mixpanelApiUrl,
  changeOrigin: true,
  pathRewrite: {
    "^/api/mixpanel": "", // Sesuaikan dengan rute API di Vercel
  },
});

export default function handler(req, res) {
  cors(corsOptions)(req, res, () => {
    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }
    return proxy(req, res);
  });
}
