import {Request,Response} from 'express'; 
import transporter from './mailer';
import { buildEmailHTML } from './emailTemplate';
const useEmailSend= async (req: Request, res: Response) => {
  const {
    hrName, hrEmail, company, role,
    emailBody, senderName, senderEmail,
    senderPhone, linkedin, portfolio, github,resume
  } = req.body;

  // Basic validation
  if (!hrEmail || !role || !company || !emailBody) {
    res.status(400).json({ success: false, message: 'Missing required fields.' });
    return;
  }

  const subject = `${role} — Application | ${senderName || 'Mouli Karmakar'}`;

  const html = buildEmailHTML({
    hrName, company, role, emailBody,
    senderName, senderEmail, senderPhone,
    linkedin, portfolio, github,resume
  });

  try {
    await transporter.sendMail({
      from: `"${senderName}" <${process.env.EMAIL_USER}>`,
      to: hrEmail,
      subject,
      text: emailBody,   // plain-text fallback
      html,              // styled HTML email
    });

    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error: any) {
    console.error('Mail send error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to send email. Check your credentials.' });
  }
}

export {useEmailSend};