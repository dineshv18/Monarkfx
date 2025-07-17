import nodemailer from "nodemailer";
import {
  getVerificationTemplate,
  getResetTemplate,
  getDeleteTemplate,
  getFeeReceiptTemplate,
  getFeeNotificationTemplate,
  getPaymentSuccessTemplate,
  getPaymentFailureTemplate,
  getFeeUpdateTemplate,
  getCertificateGeneratedTemplate,
  getContactFormTemplate
} from "../email/temp/EmailTemplate.js";

const transporter = nodemailer.createTransport({
  host: process.env.SMPT_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMPT_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const SendEmail = async ({ email, subject, message, emailType, attachments }) => {
  try {
    let htmlContent;

    switch (emailType) {
      case "VERIFY":
        subject = "Verify your email - MonarkFX - Global Trading Excellence ";
        htmlContent = getVerificationTemplate(message);
        break;
      case "DELETE":
        subject = "Delete your account - MonarkFX - Global Trading Excellence ";
        htmlContent = getDeleteTemplate(message);
        break;
      case "RESET":
        subject = "Reset your password - MonarkFX - Global Trading Excellence ";
        htmlContent = getResetTemplate(message);
        break;
      case "FEE_RECEIPT":
        subject = subject || "Fee Payment Receipt - MonarkFX - Global Trading Excellence ";
        htmlContent = getFeeReceiptTemplate(message);
        break;
      case "FEE_NOTIFICATION":
        subject = subject || "New Fee Assignment - MonarkFX - Global Trading Excellence ";
        htmlContent = getFeeNotificationTemplate(message);
        break;
      case "PAYMENT_SUCCESS":
        subject = subject || "Payment Successful - MonarkFX - Global Trading Excellence ";
        htmlContent = getPaymentSuccessTemplate(message);
        break;
      case "PAYMENT_FAILURE":
        subject = subject || "Payment Failed - MonarkFX - Global Trading Excellence ";
        htmlContent = getPaymentFailureTemplate(message);
        break;
      case "FEE_UPDATE":
        subject = subject || "Fee Update Notification - MonarkFX - Global Trading Excellence ";
        htmlContent = getFeeUpdateTemplate(message);
        break;
      case "CERTIFICATE_GENERATED":
        subject = "Course Completion Certificate - MonarkFX - Global Trading Excellence ";
        htmlContent = getCertificateGeneratedTemplate(message);
        break;
      case "CONTACT_FORM":
        subject = subject || "New Contact Form Submission - MonarkFX - Global Trading Excellence";
        htmlContent = getContactFormTemplate(message);
        break;
      default:
        htmlContent = message;
    }

    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: email,
      subject,
      html: htmlContent,
      attachments: attachments || []
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};