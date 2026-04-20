import dotenv from "dotenv";
import express from "express";
dotenv.config({ path: "./config/.env", quiet: true });
import connectToDb from "./config/db.js";
import morgan from "morgan";
import fetchRoute from "./routes/dummyRoute.js";
import webhookRoute from "./routes/webhookRoute.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Server is running"));
app.use("/data", fetchRoute);
app.use("/webhook", webhookRoute);


app.listen(PORT, () => {
  console.log(
    `${process.env.NAME}: Server is running on http://localhost:${PORT}`,
  );
  // connectToDb();
});
