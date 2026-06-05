const axios = require("axios");

const sendSMS = async (phone, message) => {
  try {
    await axios.post("https://api.ng.termii.com/api/sms/send", {
      to: phone,
      from: "OLJUNIQUE",
      sms: message,
      type: "plain",
      channel: "generic",
      api_key: process.env.TERMII_API_KEY,
    });
  } catch (error) {
    console.error("SMS Error:", error.response?.data || error.message);
  }
};

module.exports = { sendSMS };
