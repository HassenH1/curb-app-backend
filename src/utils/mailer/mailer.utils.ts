import { ObjectId } from 'mongoose';
import nodemailer, {
  TestAccount,
  Transporter,
  SentMessageInfo,
} from 'nodemailer';

// async..await is not allowed in global scope, must use a wrapper
export default async function sendVerificationEmail({
  id,
  email,
}: {
  id: ObjectId;
  email: string;
}) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // const testAccount: TestAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter: Transporter = nodemailer.createTransport({
    // host: 'smtp.ethereal.email',
    // port: 587,
    host: 'mail.privateemail.com',
    port: 465,
    secure: true,
    // secure: false, // true for 465, false for other ports
    debug: true,
    logger: true,
    auth: {
      user: process.env.PRIVATE_EMAIL_USER,
      pass: process.env.PRIVATE_EMAIL_PASSWORD,
    },
  });

  // send mail with defined transport object
  const info: SentMessageInfo = await transporter.sendMail({
    from: `"Welcome to Curb!" <${process.env.PRIVATE_EMAIL_USER}>`, // sender address
    to: email, // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Welcome to Curb', // plain text body
    html: `<div style="height: 100%; width: 100%; background: #f9f9f9; justify-content: center;">
      <div style="height: auto; width: 50%; background-color: white; margin: 0 auto; padding: 25px; border: 1px solid #E5E4E2; border-radius: 15px">
        <h1>Confirm Your Email</h1>
        <p>Hey there, you're almost ready to start enjoying The Curb App.</p> 
        <p>Simply click the big green button below to verify your email address.</p>
        <br />
        <a href="#" target="_blank" style="padding: 12px 24px; border-radius: 4px; color: #FFF; background: #198754; display: inline-block;margin: 0.5rem 0;">Confirm now</a>
        <br />
        <br />
        If you didnt ask to verify this address, you can ignore this email.
        <br />
        <br />
        Thanks,
        <br />
        The Curb App team
      </div>
    </div>`,
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
