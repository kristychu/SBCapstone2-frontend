const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    proxy("/product", {
      target: "https://skincare-api.herokuapp.com",
      changeOrigin: true,
    })
  );
};
