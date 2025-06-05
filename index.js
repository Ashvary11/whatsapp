const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const app = express();
const port = 5000;

app.use(express.json());
app.use(morgan("tiny"));
app.use("/demo", (req, res) => {
  res.send("App is working");
});
// -----------
app.use("/whatsapp", require("./whatsapp/routes/whatsappRoute.js"));


// -----------
app.listen(port, () => {
  console.log(
    "Server is up at port :",
    port,
    "\n",
    "Live URL:",
    process.env.BACKEND_URL
  );
});

// backend url
// https://whatsapp-5290.onrender.com
