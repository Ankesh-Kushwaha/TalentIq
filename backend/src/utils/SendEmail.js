import nodemailer from "nodemailer";
import { environment } from "../utils/env.js";

const transporter = nodemailer.createTransport({
  host: environment.EMAIL_HOST,
  port: environment.EMAIL_PORT,
  secure: false, // TLS
  auth: {
    user: environment.EMAIL_USER,
    pass: environment.EMAIL_PASS
  }
});

// Verify SMTP once on startup
transporter.verify((err) => {
  if (err) {
    console.error("Email server error:", err);
  } else {
    console.log("Email server ready");
  }
});

export const sendEmail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: environment.EMAIL_FROM,
    to,
    subject,
    html
  });
};
