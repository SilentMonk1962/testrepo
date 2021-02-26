const axios = require("axios").default;
const sgMail = require('@sendgrid/mail')
console.log(process.env.SENDGRID_API_KEY);
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body);
    console.log("Passing the JSON object parsed body.");
    console.log(body);
    const surveyID = body.survey_id;
    const submissionID = body.submission_id;
    const C1 = body.C1 || "NA_c1";
    const C2 = body.C2 || "NA_c2";
    const C3 = body.C3 || "NA_c3";
    const Q2 = body.Q2;
    const endTime=body.submission_completedTime;
    const msg = {
      to: 'abhishek.singh@iiml.org', // Change to your recipient
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
    };
    //This is our where our business logic begins.

    if (Q2 === 'D. I need a callback')
    {
        const res = await axios.post(process.env.DISCORD_WEBHOOK_URL, {
            content: `There is a new submission with ID: ${submissionID} under survey number: ${surveyID}.
            It was completed on ${endTime}.
            The customer's reason for not buying is ${Q2}.
            Additional details of the user are ${C1} ${C2} ${C3}.`
          });
          console.log("Submitted!");
          sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  });
        console.log('Also sent a mail to support.')
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



