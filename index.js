const express = require("express");
const app = express();

app.get("/", (req, res) => {
  return "ip: " + __dirname
});

app.listen(process.env.port || 3000);