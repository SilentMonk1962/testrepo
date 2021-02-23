const axios = require("axios").default;
exports.handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body);
    console.log(body);
        /*
    const surveyID = body.survey_id;
    const submissionID = body.submission_id;
    const C1 = body.C1 || "NA_c1";
    const C2 = body.C2 || "NA_c2";
    const C3 = body.C3 || "NA_c3";
    const Q1 = body.Q1;
    const endTime=body.submission_completedTime;
    if (Q1 === 'D. My SIP setup has issues')


    if (Q2 === 'D. I need a callback')
    {
        const res = await axios.post(process.env.SS_stop_SIP_DISCORD_WEBHOOK_URL, {
            content: `There is a new submission with ID: ${submissionID} under survey number: ${surveyID}. It was completed on ${endTime}. The customer's reason for not buying is ${Q2}. Additional details of the user are ${C1} ${C2} ${C3}.`
          });
          console.log("Submitted!");
    }
    else {
        console.log("User did not like the offering.")
    }
  
   const res = await axios.post(process.env.SS_stop_SIP_DISCORD_WEBHOOK_URL, {
    content: `There is a new submission with ID: ${submissionID} under survey number: ${surveyID}. It was completed on ${endTime}. The customer's reason for not buying is ${Q1}. Additional details of the user are ${C1} ${C2} ${C3}.`
  });
  console.log("Submitted!");
  */
    return {
      statusCode: 204,
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};