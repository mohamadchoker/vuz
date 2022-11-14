import nodemailer from 'nodemailer';

class MailService {
  public async sendEmail(to: string, subject: string, html: string) {
    const transporter = await this.createTransporter();
    const mailOptions = {
      from: process.env.MAIL_FROM,
      to,
      subject,
      html,
    };
    return transporter.sendMail(mailOptions);
  }

  private async createTransporter() {
    const account = await nodemailer.createTestAccount();
    console.log('account', account);
    return nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: false,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });
  }
}

export default MailService;
