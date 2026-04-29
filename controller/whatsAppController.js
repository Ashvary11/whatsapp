import { sendWhatsAppMessage } from "../services/sendWhatsAppMessage.js";
import { buildMessage } from "../services/messageBuilder.js";

export const sendMessageController = async (req, res) => {
  try {
    const { to, type, data } = req.body;

    if (!to || !type) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: to, type",
      });
    }
    const { type: finalType, payload } = buildMessage({ type, data }); //passing and extracting type and data from messageBuilder

    const result = await sendWhatsAppMessage({ to, type: finalType, payload });

    if (!result) {
      return res.status(500).json({
        success: false,
        message: "Failed to send message",
      
      });
    }

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Controller Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
