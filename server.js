const express = require("express");
require("dotenv").config();
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const checkScope = require("express-jwt-authz");

const app = express();

app.get("/public", function(req, res) {
  res.json({
    message: "Hello from a public API!"
  });
});

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${
      process.env.REACT_APP_AUTH0_DOMAIN
    }/.well-known/jwks.json`
  }),
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,
  algorithms: ["RS256"]
});

app.get("/private", checkJwt, function(req, res) {
  res.json({
    message: "Hello from a private API!"
  });
});

app.get("/course", checkJwt, checkScope(["read:courses"]), function(req, res) {
  console.log("Request received.");
  res.json({
    courses: [
      { id: 1, name: "Basic Financial Modelling for Early-Stage Start-ups" },
      { id: 2, name: "Advanced Financial Modelling for Growth-Stage Start-ups" }
    ]
  });
});

app.listen(3001);
console.log("API server listening on " + process.env.REACT_APP_API_URL);
