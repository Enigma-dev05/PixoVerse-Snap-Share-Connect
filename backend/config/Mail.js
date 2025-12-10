import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
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
    <h4>Hello from PixoVerse!</h4> 
    <p>Your password reset verification code is: ${otp}</p>
    <p>For security reasons, this code will expire in 5 minutes.</p>
    <p>Best regards,</p>
    <p>The PixoVerse Team</p>
    `,
  });
};

export default sendMail;
