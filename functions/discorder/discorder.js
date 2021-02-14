const axios = require("axios").default;

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body);
    console.log("Passing the JSON object parsed body.");
    const surveyID=body.survey_id;
    const startTime=body.submission_startTime;
    const endTime=body.submission_completedTime;
    const res = await axios.post(process.env.DISCORD_WEBHOOK_URL, {
      content: `Survey number ${surveyID} started at ${startTime} and ended at ${endTime}.`
    });
    console.log("Submitted!");
    return {
      statusCode: 204,
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};