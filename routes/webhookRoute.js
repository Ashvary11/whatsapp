import express from "express";
import {
  receiveMessage,
  verifyWebhook,
} from "../controller/webhookController.js";

const router = express.Router();

router.get("/", verifyWebhook);
router.post("/", receiveMessage); //Incoming messages

export default router;
