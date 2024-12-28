"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailUtil = void 0;
const nodemailer = require("nodemailer");
class EmailUtil {
    static async sendEmail(to, subject, text) {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false,
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
exports.EmailUtil = EmailUtil;
//# sourceMappingURL=email.util.js.map