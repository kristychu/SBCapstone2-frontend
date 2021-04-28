const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware(["/product", "/products"], {
      target: "https://skincare-api.herokuapp.com",
      headers: { "Access-Control-Allow-Origin": "*" },
      changeOrigin: true,
    })
  );

  // app.use(
  //   createProxyMiddleware("/api", {
  //     target: process.env.REACT_APP_BASE_URL,
  //     changeOrigin: true,
  //   })
  // );
};
