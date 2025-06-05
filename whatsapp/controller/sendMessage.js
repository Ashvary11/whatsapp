const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");
const mime = require("mime-types");

const apiVersion = "v22.0";
const phoneNumberId = "606756765863721";
const baseUrl = `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`;

let headers = {
  Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
  "Content-Type": "application/json",
};

const sendTextMessage = async (req, res) => {
  try {
    const { recipientNumber = "917000240904", message } = req.body;

    const data = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: recipientNumber,
      type: "text",
      text: {
        preview_url: true,
        body: message,
      },
    };
    const response = await axios.post(baseUrl, data, {
      headers,
    });

    console.log(response);

    res.json({
      success: true,
      recipientNumber,
      response: response.data,
    });
  } catch (error) {
    console.error(
      "WhatsApp API Error: sendTextMessage",
      error?.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      error: error?.response?.data || error.message,
    });
  }
};

const sendTemplateMessage = async (req, res) => {
  try {
    const { recipientNumber = "917000240904", template_name } = req.body;

    const data = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: recipientNumber,
      type: "template",
      template: {
        name: template_name,
        language: {
          code: "en_US",
        },
      },
    };
    const response = await axios.post(baseUrl, data, {
      headers,
    });

    console.log(response);

    res.json({
      success: true,
      recipientNumber,
      response: response.data,
    });
  } catch (error) {
    console.error(
      "WhatsApp API Error: sendTextMessage",
      error?.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      error: error?.response?.data || error.message,
    });
  }
};
// 7days upload and get media upload id
const uploadMedia = async (req, res) => {
  try {
    const file = req.file;
    const fileType = req.body.type;
    const mimeType = mime.lookup(file.originalname); // detect MIME type
    const fileName = file.originalname;
    const filePath = file.path;

    const form = new FormData();
    form.append("file", fs.createReadStream(filePath), {
      filename: fileName,
      contentType: mimeType || "application/octet-stream",
    });
    form.append("type", mimeType);
    form.append("messaging_product", "whatsapp");

    const response = await axios.post(
      `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/media`,
      form,
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          ...form.getHeaders(),
        },
      }
    );

    fs.unlinkSync(file.path); // Clean up

    res.json({
      success: true,
      media_id: response.data.id,
    });
  } catch (error) {
    console.error(
      "WhatsApp Upload Error:",
      error?.response?.data || error.message
    );
    res.status(500).json({
      success: false,
      error: error?.response?.data || error.message,
    });
  }
};

//100mb limit
const sendDocument = async (req, res) => {
  try {
    const {
      recipientNumber,
      mediaId,
      mediaLink,
      mediaFileName,
      mediaCaptionText,
    } = req.body;

    const document = mediaId
      ? { id: mediaId, filename: mediaFileName, caption: mediaCaptionText }
      : { link: mediaLink, filename: mediaFileName, caption: mediaCaptionText };

    const data = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: recipientNumber,
      type: "document",
      // document: {
      //   id: mediaId, //<!-- Only if using uploaded media -->
      //   link: mediaLink, //<!-- Only if using hosted media (not recommended) -->
      //   filename: mediaFileName,
      //   caption: mediaCaptionText,
      // },
      document,
    };
    const response = await axios.post(baseUrl, data, {
      headers,
    });

    console.log(response);

    res.json({
      success: true,
      recipientNumber,
      response: response.data,
    });
  } catch (error) {
    console.error(
      "WhatsApp API Error: sendTextMessage",
      error?.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      error: error?.response?.data || error.message,
    });
  }
};

const sendAudio = async (req, res) => {
  try {
    const { recipientNumber, audioId, audioLink } = req.body;

    const audio = audioId ? { id: audioId } : { link: audioLink };

    const data = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: recipientNumber,
      type: "audio",
      audio,
    };
    const response = await axios.post(baseUrl, data, {
      headers,
    });

    console.log(response.data);

    res.json({
      success: true,
      recipientNumber,
      response: response.data,
    });
  } catch (error) {
    console.error(
      "WhatsApp API Error: sendTextMessage",
      error?.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      error: error?.response?.data || error.message,
    });
  }
};
const sendImage = async (req, res) => {
  try {
    const { recipientNumber, imageId, imageLink, captionText } = req.body;

    const imageObj = imageId
      ? { id: imageId, caption: captionText }
      : { link: imageLink, caption: captionText };

    const data = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: recipientNumber,
      type: "image",
      image: imageObj,
    };
    const response = await axios.post(baseUrl, data, {
      headers,
    });

    console.log(response.data);

    res.json({
      success: true,
      recipientNumber,
      response: response.data,
    });
  } catch (error) {
    console.error(
      "WhatsApp API Error: sendTextMessage",
      error?.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      error: error?.response?.data || error.message,
    });
  }
};
const sendCTA_URL = async (req, res) => {
  try {
    const {
      recipientNumber,
      headerType, // "text", "image", "document", or "video"
      headerData, // actual URL or text depending on type
      bodyText,
      footerText,
      buttonText,
      buttonUrl,
    } = req.body;

    // Build dynamic header
    let header;
    if (headerType === "text") {
      header = {
        type: "text",
        text: headerData,
      };
    } else if (headerType === "image") {
      header = {
        type: "image",
        image: {
          link: headerData,
        },
      };
    } else if (headerType === "document") {
      header = {
        type: "document",
        document: {
          link: headerData,
        },
      };
    } else if (headerType === "video") {
      header = {
        type: "video",
        video: {
          link: headerData,
        },
      };
    }

    const interactiveObj = {
      type: "cta_url",
      header,
      body: {
        text: bodyText,
      },
      action: {
        name: "cta_url",
        parameters: {
          display_text: buttonText,
          url: buttonUrl,
        },
      },
      footer: footerText ? { text: footerText } : undefined,
    };

    const data = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: recipientNumber,
      type: "interactive",
      interactive: interactiveObj,
    };

    const response = await axios.post(baseUrl, data, { headers });

    console.log("WhatsApp Response:", response.data);

    res.json({
      success: true,
      recipientNumber,
      response: response.data,
    });
  } catch (error) {
    console.error(
      "WhatsApp API Error:",
      error?.response?.data || error.message
    );
    res.status(500).json({
      success: false,
      error: error?.response?.data || error.message,
    });
  }
};

module.exports = {
  sendTextMessage,
  sendTemplateMessage,
  sendDocument,
  uploadMedia,
  sendAudio,
  sendImage,
  sendCTA_URL,
};
