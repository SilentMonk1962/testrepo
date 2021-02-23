const axios = require("axios").default;
exports.handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body);
    console.log(body);
    return {
      statusCode: 204,
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};