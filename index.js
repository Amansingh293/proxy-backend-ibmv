const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

const preFetch = (req, res, next) => {
  if (req.headers.authorization) console.log("authorization exists");
  else console.log("authorization does not exist");
  next();
};

app.use(
  "/api",
  preFetch,
  createProxyMiddleware({
    target: "https://goloka-api.edmingle.com/nuSource/api/v1",
    changeOrigin: true,
    pathRewrite: {
      "^/api/": "/",
    },
  })
);
app.listen(4000, () => {
  console.log("Server is running at port : 4000");
});
