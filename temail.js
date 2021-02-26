
const sgMail = require('@sendgrid/mail');
const body={};
sgMail.setApiKey("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");
    const surveyID = body.survey_id || "blablaID";
    const submissionID = body.submission_id || "blablaSubmissionID";
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
      html: `
      Hello Team, 
      There is a new submission with ID: ${submissionID} under survey number: ${surveyID}.
      It was completed on ${endTime}.
      The customer's reason for not buying is ${Q2}.
      Additional details of the user are ${C1} ${C2} ${C3}.
      Regards,
      NotifierBot`,
    };
    //This is our where our business logic begins.
sgMail.send(msg).then(() => {console.log('Also sent a mail to support.')}).catch((error) => {console.error(error)});



