import express from "express";
import { sendMessageController } from "../controller/whatsappController.js";

const router = express.Router();

// POST /api/whatsapp/send
router.post("/send", sendMessageController);

export default router;
