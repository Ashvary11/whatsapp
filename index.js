const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 5000;
const { WHATS_APP_ACCESS_TOKEN } = require("./env_secret.js");

app.use(express.json());
app.use(morgan("tiny"));
app.use("/", (req, res) => {
  res.send("App is working");
});




app.listen(port, () => {
  console.log("Server is up at port :", port);
});
