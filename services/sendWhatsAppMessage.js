import axios from "axios";

/**
 * Universal WhatsApp Sender
 * @param {string} to - recipient phone number (with country code)
 * @param {string} type - message type
 * @param {object} payload - type-specific payload
 */

export const sendWhatsAppMessage = async ({
  to,
  type = "text",
  payload = {},
}) => {
  const WHATSAPP_URL = `https://graph.facebook.com/v25.0/${process.env.WHATSAPP_APP_PHONE_NUMBER_ID}/messages`;

  console.log(
    "process.env.WHATSAPP_APP_PHONE_NUMBER_ID",
    process.env.WHATSAPP_APP_PHONE_NUMBER_ID,
  );
  try {
    if (!to) throw new Error("Recipient Number is required");
    const data = {
      messaging_product: "whatsapp",
      to,
      type,
      ...payload, // inject type-specific payload
    };
    const headers = {
      Authorization: `Bearer ${process.env.WHATSAPP_APP_TOKEN}`,
      "Content-Type": "application/json",
    };
    const response = await axios.post(WHATSAPP_URL, data, {
      headers,
      timeout: 5000,
    });

    console.log("📤 Sent:", JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (err) {
    console.error("❌ Send error:", err.response?.data || err.message);
    return null;
  }
};

// types :

// text
// image
// audio
// video
// document
// location
// contacts
// TEMPLATE (Business Use)
// INTERACTIVE BUTTON
// interactive LIST
// sticker
