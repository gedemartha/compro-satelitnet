import { google } from "googleapis";

const OAuth2 = google.auth.OAuth2;
// eslint-disable-next-line
const nodemailer = require("nodemailer");

const oauth2Client = new OAuth2(
  process.env.EMAIL_CLIENT_ID,
  process.env.EMAIL_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground" // redirect URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.EMAIL_REFRESH_TOKEN,
});

export async function sendMail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const accessToken = await oauth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL_USER,
      clientId: process.env.EMAIL_CLIENT_ID,
      clientSecret: process.env.EMAIL_CLIENT_SECRET,
      refreshToken: process.env.EMAIL_REFRESH_TOKEN,
      accessToken: accessToken.token || "",
    },
  });

  const mailOptions = {
    from: `SatelitNET <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  const result = await transporter.sendMail(mailOptions);
  return result;
}
