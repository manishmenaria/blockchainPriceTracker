import * as nodemailer from 'nodemailer';

export class EmailUtil {
  static async sendEmail(
    to: string,
    subject: string,
    text: string,
  ): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // "smtp.gmail.com"
      port: Number(process.env.SMTP_PORT), // 587
      secure: false, // Use TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    console.log('Using email:', process.env.EMAIL_USER);
    console.log('SMTP host:', process.env.EMAIL_PASS);
    console.log('SMTP port:', process.env.SMTP_PORT);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
  }
}
