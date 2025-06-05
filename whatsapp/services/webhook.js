export const verifyWebhook = (req, res) => {
  const VERIFY_TOKEN = "iamverifytoken" || process.env.META_VERIFY_TOKEN;
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token && mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("✅ Webhook verified!");
    return res.status(200).send(challenge);
  } else {
    return res.sendStatus(403);
  }
};

export const handleWebhookEvent = async (req, res) => {
  try {
    const entry = req.body.entry?.[0];
    const changes = entry?.changes?.[0]?.value;

    if (changes?.messages) {
      const message = changes.messages[0];
      const messageType = message.type;
      const baseData = {
        messageId: message.id,
        from: message.from,
        type: messageType,
        meta: message,
      };

      req.body = baseData;
      console.log("Incoming Message , baseData : ", baseData);
    }

    res.sendStatus(200);
  } catch (err) {
    console.error("Webhook processing error:", err);
    res.sendStatus(500);
  }
};
