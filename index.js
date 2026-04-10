import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import fetchRoute from "./routes/dummyRoute.js";
dotenv.config({ path: "./config/.env" });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server is running");
});
app.use("/data", fetchRoute);

app.listen(PORT, () => {
  console.log(
    `${process.env.NAME}: Server is running on http://localhost:${PORT}`,
  );
});
