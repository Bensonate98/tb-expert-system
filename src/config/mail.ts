import nodemailer from "nodemailer";
import { MAIL_HOST, MAIL_PASSWORD, MAIL_USER } from "./env";

const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: Number(MAIL_HOST),
  secure: true,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  },
});

export default transporter;
