import nodemailer, {
  TestAccount,
  Transporter,
  SentMessageInfo,
} from 'nodemailer';

/**
 * should make variables private
 */
class Mailer {
  host = 'smtp.ethereal.email';
  port = 587;
  testAccount?: TestAccount;
  transporter?: Transporter<SentMessageInfo>;

  constructor(host?: string, port?: number) {
    if (host) this.host = host;
    if (port) this.port = port;
  }

  createTestAccount = async () => {
    try {
      this.testAccount = await nodemailer.createTestAccount();
    } catch (error) {
      throw new Error(`${error} Create test account issue`);
    }
  };

  createTransport = async () => {
    this.transporter = nodemailer.createTransport({
      host: this.host,
      port: this.port,
      secure: false, // true for 465, false for other ports
      auth: {
        user: this.testAccount?.user, // generated ethereal user
        pass: this.testAccount?.pass, // generated ethereal password
      },
    });
  };

  sendMail = async (cb?: Function) => {
    try {
      //call cb here and get template from it and pass it thru
      await this.transporter?.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: 'bar@example.com, baz@example.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>', // html body
      });
    } catch (error) {
      throw new Error(`${error} sendMail issue`);
    }
  };

  template = async () => {};
}
