import { handleMessage } from "../services/autoMessageHandler.js";

// Webhook Verification (GET)
export const verifyWebhook = (req, res) => {
  // console.log("process.env.WEBHOOK_VERIFY_TOKEN",process.env.WEBHOOK_VERIFY_TOKEN);

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === process.env.WEBHOOK_VERIFY_TOKEN) {
    console.log("Webhook verified");
    return res.status(200).send(challenge);
  } else {
    return res.sendStatus(403);
  }
};

// Receive Messages (POST)
export const receiveMessage = async (req, res) => {
  try {
    const body = req.body;
    if (!body.object) {
      return res.sendStatus(404);
    }

    const value = body.entry?.[0]?.changes?.[0]?.value;

    //   Incoming Message
    if (value?.messages) {
      // for (const message of value.messages) {
      const message = value.messages[0];
      console.log("📩 New Message Received");
      console.log("From:", message.from, "Type:", message.type);

      // await handleMessage(message); //auto Response And Message Handler with Message type
    }

    //  Message Status Updates
    if (value?.statuses) {
      const status = value.statuses[0];
      const data = {
        "Message ID:": status.id,
        "Status:": status.status,
        "Recipient:": status.recipient_id,
      };
      console.log("📊 Status Update: ", data);
    }
    return res.sendStatus(200);
  } catch (error) {
    console.error("Webhook error:", error);
    return res.sendStatus(500);
  }
};
