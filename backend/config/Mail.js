import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMail = async (userEmail, otp) => {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to: userEmail,
    subject: "Password Reset - PixoVerse",
    html: `
    <h3>Hello from PixoVerse!</h3> 
    <p>Your password reset verification code is: ${otp}</p>
    <p>For security reasons, this code will expire in 5 minutes.</p>
    <h3>Best regards,</h3>
    <h4>The PixoVerse Team</h4>
    `,
  });
};

export default sendMail;
