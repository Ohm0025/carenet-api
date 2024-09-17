import nodemailer from "nodemailer";
import { google } from "googleapis";

const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  });
  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        console.error(err);
        reject("Failed to create access token");
      }
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.GMAIL_USER,
      accessToken,
      clientId: process.env.GMAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    },
  });
  return transporter;
};

export const sendVerificationEmail = async (email, token) => {
  const transporter = await createTransporter();
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Carenet : Verify your Email",
    html: `
        <h1>Verify Your Email</h1>
      <p>Please click the link below to verify your email address:</p>
      <p>${token}</p>
      <a href="${process.env.FRONTEND_URL}/verify-email/${token}">Verify Email</a>
      `,
  };
  await transporter.sendMail(mailOptions);
};
