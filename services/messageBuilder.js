/**
 * Build WhatsApp message payload
 * @param {string} type
 * @param {object} data
 */

export const buildMessage = ({ type, data = {} }) => {
  if (!type) throw new Error("Message type is required");

  switch (type) {
    case "text":
      if (!data.message) throw new Error("Text message is required");

      return {
        type: "text",
        payload: {
          text: {
            body: data.message,
          },
        },
      };

    case "image":
      if (!data.link) throw new Error("Image link is required");

      return {
        type: "image",
        payload: {
          image: {
            link: data.link,
            caption: data.caption,
          },
        },
      };

    case "video":
      if (!data.link) throw new Error("Video link is required");

      return {
        type: "video",
        payload: {
          video: {
            link: data.link,
            caption: data.caption,
          },
        },
      };

    case "audio":
      if (!data.link) throw new Error("Audio link is required");

      return {
        type: "audio",
        payload: {
          audio: {
            link: data.link,
          },
        },
      };

    case "document":
      if (!data.link) throw new Error("Document link is required");

      return {
        type: "document",
        payload: {
          document: {
            link: data.link,
            filename: data.filename,
          },
        },
      };

    case "sticker":
      if (!data.link && !data.id)
        throw new Error("Sticker link or media id is required");

      return {
        type: "sticker",
        payload: {
          sticker: data.link ? { link: data.link } : { id: data.id },
        },
      };

    case "location":
      if (!data.lat || !data.lng)
        throw new Error("Latitude and Longitude are required");

      return {
        type: "location",
        payload: {
          location: {
            latitude: data.lat,
            longitude: data.lng,
            name: data.name,
            address: data.address,
          },
        },
      };

    case "template":
      if (!data.name) throw new Error("Template name is required");

      return {
        type: "template",
        payload: {
          template: {
            name: data.name,
            language: {
              code: data.language || "en_US",
            },
            components: data.components || [],
          },
        },
      };

    case "interactive_button":
      return {
        type: "interactive",
        payload: {
          interactive: {
            type: "button",
            body: {
              text: data.body,
            },
            ...(data.footer && {
              footer: {
                text: data.footer,
              },
            }),
            action: {
              buttons: data.options.map((option, index) => ({
                type: "reply",
                reply: {
                  id: `option_${index + 1}`, // scalable id
                  title: option,
                },
              })),
            },
          },
        },
      };
    case "interactive_list":
      return {
        type: "interactive",
        payload: {
          interactive: {
            type: "list",
            body: {
              text: data.body,
            },
            ...(data.footer && {
              footer: {
                text: data.footer,
              },
            }),
            action: {
              button: data.buttonText || "View",
              sections: [
                {
                  title: data.sectionTitle || "Options",
                  rows: data.options.map((option, index) => ({
                    id: `option_${index + 1}`,
                    title: option.title,
                    ...(option.description && {
                      description: option.description,
                    }),
                  })),
                },
              ],
            },
          },
        },
      };
    case "contacts":
      if (!data.contacts || !Array.isArray(data.contacts)) {
        throw new Error("Contacts array is required");
      }

      return {
        type: "contacts",
        payload: {
          contacts: data.contacts.map((contact) => ({
            name: {
              formatted_name: contact.name,
              first_name: contact.name,
            },
            phones: [
              {
                phone: contact.phone,
                type: "MOBILE",
              },
            ],
          })),
        },
      };
    case "reaction":
      if (!data.message_id || !data.emoji)
        throw new Error("message_id and emoji required");

      return {
        type: "reaction",
        payload: {
          reaction: {
            message_id: data.message_id,
            emoji: data.emoji,
          },
        },
      };

    default:
      throw new Error(`Unsupported message type: ${type}`);
  }
};

// type: "interactive"
//         ↓
//    interactive.type:
//         ↓
//   "button" | "list" | "product" | "product_list" | "flow"

// "buttons": [
//             {
//                 "type": "reply",
//                 "reply": {
//                     "id": "yes_option",
//                     "title": "Yes"
//                 }
//             },
//             {
//                 "type": "reply",
//                 "reply": {
//                     "id": "no_option",
//                     "title": "No"
//                 }
//             }
//         ]
