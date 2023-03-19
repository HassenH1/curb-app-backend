import nodemailer, {
  TestAccount,
  Transporter,
  SentMessageInfo,
} from 'nodemailer';

/**
 * should make variables private
 */
export class Mailer {
  emailTo: string = 'hassen@mailinator.com'; //ethereal doesnt actually email anything
  host: string = 'smtp.ethereal.email';
  port: number = 587;
  testAccount?: TestAccount;
  transporter?: Transporter<SentMessageInfo>;
  emailTemplate: number | string = 'example';

  constructor(host?: string, port?: number, emailTemplate?: number | string) {
    if (host) this.host = host;
    if (port) this.port = port;
    if (emailTemplate) this.emailTemplate = emailTemplate;
  }

  setup = async () => {
    try {
      await this.createTestAccount();
      this.transporter = this.createTransport();
      await this.sendMail();
    } catch (error) {
      throw new Error(`${error} main function issue`);
    }
  };

  private createTestAccount = async () => {
    try {
      this.testAccount = await nodemailer.createTestAccount();
    } catch (error) {
      throw new Error(`${error} Create test account issue`);
    }
  };

  private createTransport = () => {
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: this.testAccount?.user, // generated ethereal user
        pass: this.testAccount?.pass, // generated ethereal password
      },
    });
  };

  private sendMail = async () => {
    try {
      const template = this.emailVerificationTemplate(this.emailTemplate);
      const info = await this.transporter?.sendMail(template);

      console.log('INFO: ', info);
      console.log('Message sent: %s', info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    } catch (error) {
      throw new Error(`${error} sendMail issue`);
    }
  };

  private emailVerificationTemplate = (templateNum?: number | string) => {
    const html: string = `
    <p>Welcome...</p>

    <p>You registered an account on Curb App, before being able to use your account you need to verify that this is your email address by clicking here: [link]</p>

    <p>Kind Regards, Curb!</p>
  `;

    const html2: string = `
    <h1>Final step...</h1>
    <br />
    Click this button to verify your email address.
    <br />
    <a href="#" target="_blank" style="padding: 12px 24px; border-radius: 4px; color: #FFF; background: #2B52F5;display: inline-block;margin: 0.5rem 0;">Confirm now</a>
    <br />
    <br />
    If you didnt ask to verify this address, you can ignore this email.
    <br />
    <br />
    Thanks,
    <br />
    The Curb App team
  `;

    switch (templateNum) {
      case 1:
        return {
          from: '"Fred Foo 👻" <curbapp@example.com>', // sender address
          to: this.emailTo, // list of receivers
          subject: 'Welcome to Curb! ✔', // Subject line
          text: 'Verify your email address', // plain text body
          html: html, // html body
        };

      case 2:
        return {
          from: '"Fred Foo 👻" <curbapp@example.com>', // sender address
          to: this.emailTo, // list of receivers
          subject: 'Welcome to Curb! ✔', // Subject line
          text: 'Verify your email address', // plain text body
          html: html2, // html body
        };

      case 'example':
        return {
          from: '"Fred Foo 👻" <foo@example.com>', // sender address
          to: this.emailTo, // list of receivers
          subject: 'Hello ✔', // Subject line
          text: 'Hello world?', // plain text body
          html: '<b>Hello world?</b>', // html body
        };

      default:
        return {
          from: 'hassen@mailinator.com',
          to: 'hassen@mailinator.com',
          subject: 'Sending Email using Node.js',
          text: 'Wow!',
        };
    }
  };
}
