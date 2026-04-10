import express from "express";
import { getDummyData } from "../controller/dataController.js";

const route = express.Router();

route.get("/", getDummyData);

export default route;
