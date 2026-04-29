import { sendWhatsAppMessage } from "../services/sendWhatsAppMessage.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const handleMessage = async (message) => {
  const from = message.from;

  switch (message.type) {
    case "text":
      await handleText(from, message.text.body);
      break;

    case "image":
      await handleImage(from, message.image);
      break;

    case "audio":
    case "video":
    case "document":
    case "sticker":
    case "location":
    case "contacts":
    case "interactive":
    case "button":
      console.log(`⚠️ Received ${message.type}`);
      await sendMessage(from, `Received ${message.type}, not supported yet`);
      break;
    default:
      await sendMessage(from, "Unsupported message type");
  }
};

const handleText = async (from, text) => {
  await delay(3000); //delay purposely
  if (text.toLowerCase() === "hi") {
    await sendMessage(from, "Hello from System👋, I received your message!");
  } else {
    await sendMessage(from, "I didn't understand");
  }
};

const handleImage = async (from, image) => {
  console.log("📸 Image ID:", image.id);
  await sendMessage(from, "Nice image 📸");
};
