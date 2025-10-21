import { MAIL_USER } from '../../config/env';
import transporter from '../../config/mail';

export const sendMail = async (to: string, subject: string, html: string) => {
  try {
    const info = await transporter.sendMail({
      from: `"Mindwave Connect" <${MAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log('✅ Email sent:', info.messageId);
    return info;
  } catch (err) {
    console.error('❌ Email error:', err);
  }
};
