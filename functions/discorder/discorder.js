const axios = require("axios").default;
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
exports.handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body) || {};
    //console.log("Passing the JSON object parsed body.");
    //console.log(body);
    const surveyID = body.survey_id || "NA";
    const submissionID = body.submission_id || "NA";
    const C1 = body.C1 || "NA";
    const C2 = body.C2 || "NA";
    const C3 = body.C3 || "NA";
    const Q2 = body.Q2;
    const endTime=body.submission_completedTime;
    const msg = {
      to: 'abhishek.singh@kuvera.in', // Change to your recipient
      from: 'abhishek.singh@kuvera.in', // Change to your verified sender
      subject: `Group Health CallBackRequest | SubmissionID ${submissionID}`,
      text: `
      Hello Team, 
      There is a new submission with ID: ${submissionID} under survey number: ${surveyID}.
      It was completed on ${endTime}.
      The customer's reason for not buying is ${Q2}.
      Additional details of the user are ${C1} ${C2} ${C3}.
      Regards,
      NotifierBot`,
      html: `
      Hello Team, 
      There is a new submission with ID: ${submissionID} under survey number: ${surveyID}.
      It was completed on ${endTime}.
      The customer's reason for not buying is ${Q2}.
      Additional details of the user are ${C1} ${C2} ${C3}.
      Regards,
      NotifierBot`
    };
    //This is our where our business logic begins.
    if (Q2 === 'D. I need a callback')
    {
      sgMail.send(msg).then(() => {console.log(`Email sent to ${msg.to}.`)}).catch((error) => {console.error(error)});
      const res = await axios.post(process.env.DISCORD_WEBHOOK_URL, {
            content: `There is a new submission with ID: ${submissionID} under survey number: ${surveyID}.
            It was completed on ${endTime}.
            The customer's reason for not buying is ${Q2}.
            Additional details of the user are ${C1} ${C2} ${C3}.`
          });
          console.log("Submitted!");
    }
    else {
        console.log("User did not like the offering.")
    }
    return {
      statusCode: 204,
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};



