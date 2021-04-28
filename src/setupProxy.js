const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/product", {
      target: "https://skincare-api.herokuapp.com",
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware("/products", {
      target: "https://skincare-api.herokuapp.com",
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware("/api", {
      target: process.env.REACT_APP_BASE_URL || "http://localhost:3001",
      changeOrigin: true,
    })
  );
};
