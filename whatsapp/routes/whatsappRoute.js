const express = require("express");
const {
  sendTextMessage,
  sendTemplateMessage,
  sendDocument,
  uploadMedia,
  sendAudio,
  sendImage,
  sendCTA_URL,
  sendVideo,
  contextualReplies,
  interactiveList,
  sendLocation,
} = require("../controller/sendMessage");

const multer = require("multer");
const { verifyWebhook, handleWebhookEvent } = require("../services/webhook");
const upload = multer({ dest: "uploads/" });

const route = express.Router();

route.post("/sendTextMessage", sendTextMessage);
route.post("/sendTemplateMessage", sendTemplateMessage);
route.post("/uploadMedia", upload.single("file"), uploadMedia);
route.post("/sendDocument", sendDocument);
route.post("/sendAudio", sendAudio);
route.post("/sendImage", sendImage);
route.post("/sendCTA_URL", sendCTA_URL);
route.post("/sendVideo", sendVideo);
route.post("/sendLocation", sendLocation);
route.post("/contextualReplies", contextualReplies);
route.post("/interactiveList", interactiveList);

/////////////// webhook

route.get("/webhook", verifyWebhook); // Meta verify endpoint
route.post("/webhook", handleWebhookEvent); // Meta sends events here

module.exports = route;
