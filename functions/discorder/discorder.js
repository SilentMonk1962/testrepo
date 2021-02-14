const axios = require("axios").default;

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
  try {
    console.log("Passing the raw event body.");
    console.log(event.body);
    const body = JSON.parse(event.body);
    console.log("Passing the JSON object parsed body.");
    console.log(body);
    const res = await axios.post(process.env.DISCORD_WEBHOOK_URL, {
      content: body
    });
    console.log("Submitted!");
    return {
      statusCode: 204,
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};