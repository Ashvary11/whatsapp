import axios from "axios";

export const sendMessage = async (to, message) => {
  const url = `https://graph.facebook.com/v25.0/${process.env.WHATSAPP_APP_PHONE_NUMBER_ID}/messages`;

  const data = {
    messaging_product: "whatsapp",
    to: to,
    type: "text",
    text: {
      body: message,
    },
  };
  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_APP_TOKEN}`,
        "Content-Type": "application/json",
      },
      timeout: 5000,
    });

    console.log("📤 Sent:", response.data);
    return response.data;
  } catch (err) {
    console.error("Send error:", err.response?.data || err.message);
    return null;
  }
};
