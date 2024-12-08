import { baseUrlEC2 } from '#configs/url.config.js';
import transporter from '#utils/nodemailer/transporter.js';
import verificationTemplate from '#utils/nodemailer/verificationTemplate.js';

export default function sendVerificationMail(id: string, target: string = 'forCodeitFS2nd@gmail.com') {
  const verificationLink = `${baseUrlEC2}/${id}/auth/verify`;

  const verificationMessage = {
    from: 'forCodeitFS2nd@gmail.com',
    to: target,
    subject: 'HanCook 이메일 인증',
    html: verificationTemplate.replace(/{{verificationLink}}/g, verificationLink),
  };

  transporter.sendMail(verificationMessage);
}
