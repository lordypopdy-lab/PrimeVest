import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const sendEmail = async () => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "deelordpopdy2@gmail.com",
    subject: "Test Email from Node.js",
    text: "Hello! This is a test email sent from Node.js",
  };

  await transporter.sendMail(mailOptions);
  console.log("📧 Email sent successfully");
};

sendEmail();