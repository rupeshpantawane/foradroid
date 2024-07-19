const APP = require("../config/app.json");
const sgMail = require("@sendgrid/mail");

const sendgridAPIKey = APP.development.SENDGRID_API_KEY;
sgMail.setApiKey(sendgridAPIKey);

const sendInstitutionApprovalEmail = (email,emailTemplate) => {
  sgMail.send({
    to: email,
    from: APP.development.SENDGRID_EMAIL_ID,
    subject: "Institution Approval",
    //text: `Hello ${uname},  ${otp} this is OTP please enter and login`,
    html: emailTemplate
  });
};

const sendEmailToUser = async (toEmail,subject, emailTemplate) => {
  const smtpRes = sgMail.send({
    to: toEmail,
    from: APP.development.SENDGRID_EMAIL_ID,
    subject: subject,
    html: emailTemplate
  });

  return smtpRes;
};


module.exports = {
    sendInstitutionApprovalEmail,
    sendEmailToUser
};
