const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    proxy("/product", {
      target: "https://skincare-api.herokuapp.com",
      secure: false,
      changeOrigin: true,
    })
  );

  app.use(
    proxy("/products", {
      target: "https://skincare-api.herokuapp.com",
      secure: false,
      changeOrigin: true,
    })
  );

  app.use(
    proxy("/api", {
      target: process.env.REACT_APP_BASE_URL || "http://localhost:3001",
      changeOrigin: true,
    })
  );
};
