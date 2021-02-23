const axios = require("axios").default;
exports.handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body);
    console.log(body);
    const userEmail = body.C3 || "Email not provided";
    const userName = body.C4 || "UserName not provided";
    const amountSIP = body.C2 || "SIP amount not provided";
    const surveyID = body.survey_id;
    const submissionID = body.submission_id;
    const endTime= body.submission_completedTime;
    const Q1 = body.Q1;
    const Q2 = body.Q2;
        const res = await axios.post(process.env.SS_stop_SIP_DISCORD_WEBHOOK_URL, {
            content: `New Submission: ${submissionID} from survey: ${surveyID}. CompletedOn: ${endTime}. UserName:${userName}. UserEmail: ${userEmail}. Stopped SIP amount: ${amountSIP}. Reason for stopping SIP: ${Q1}. Switching to (if shared): ${Q2}.`
          });
          console.log("Submitted!");
    return {
      statusCode: 204,
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};