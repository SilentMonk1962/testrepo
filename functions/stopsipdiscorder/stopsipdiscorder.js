const axios = require("axios").default;
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
exports.handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body);
    console.log(body);
    const userEmail = body.C3 || "Email not available";
    const userName = body.C4 || "UserName not available";
    const amountSIP = body.C2 || "SIP amount not available";
    const surveyID = body.survey_id;
    const submissionID = body.submission_id;
    const endTime= body.submission_completedTime;
    const Q1 = body.Q1;
    const Q2 = body.Q2 || "Not available";
    const msg = {
      to: 'support@kuvera.in', // Change to your recipient
      from: 'abhishek.singh@kuvera.in', // Change to your verified sender
      subject: `SIP Issue reported on Survey | UserEmail ${userEmail}`,
      text: `
      Hello Team,
      New Submission: ${submissionID} from survey: ${surveyID}.
      CompletedOn: ${endTime}.
      UserName:${userName}. 
      UserEmail: ${userEmail}. 
      Stopped SIP amount: ${amountSIP}.
      Reason for stopping SIP: ${Q1}.
      Switching to (if shared): ${Q2}.
      Regards,
      NotifierBot`,
      html: `
      Hello Team,
      New Submission: ${submissionID} from survey: ${surveyID}.
      CompletedOn: ${endTime}.
      UserName:${userName}. 
      UserEmail: ${userEmail}. 
      Stopped SIP amount: ${amountSIP}.
      Reason for stopping SIP: ${Q1}.
      Switching to (if shared): ${Q2}.
      Regards,
      NotifierBot`
    };
    if (Q1 ==='D. My SIP setup has issues'){
      sgMail.send(msg).then(() => {console.log(`Email sent to ${msg.to}.`)}).catch((error) => {console.error(error)});
    } else {
      console.log('User stopped SIP for non technical reasons.')
    }
        const res = await axios.post(process.env.SS_stop_SIP_DISCORD_WEBHOOK_URL, {
            content: `New Submission: ${submissionID} from survey: ${surveyID}.
            CompletedOn: ${endTime}.
            UserName:${userName}. 
            UserEmail: ${userEmail}. 
            Stopped SIP amount: ${amountSIP}.
            Reason for stopping SIP: ${Q1}.
            Switching to (if shared): ${Q2}.
            `
          });
          console.log("Submitted!");
    return {
      statusCode: 204,
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};