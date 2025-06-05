const express = require("express");
const {
  sendTextMessage,
  sendTemplateMessage,
  sendDocument,
  uploadMedia,
} = require("../controller/sendMessage");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const route = express.Router();

route.post("/sendTextMessage", sendTextMessage);
route.post("/sendTemplateMessage", sendTemplateMessage);
route.post("/uploadMedia", upload.single("file"), uploadMedia);
route.post("/sendDocument", sendDocument);

module.exports = route;
