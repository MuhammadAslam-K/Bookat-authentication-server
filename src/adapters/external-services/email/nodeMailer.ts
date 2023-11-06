import nodemailer from 'nodemailer';
import { rideConfirm } from './template/rideConfirm-email-template';
import { emailInfo, rideConfirmEmailData } from '../../../business/interfaces/email';


export default {
    sendLink: async (data: emailInfo) => {
        try {
            const { to, subject, message } = data
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.NODEMAILER_USER_EMAIL,
                    pass: process.env.NODEMAILER_PASS,
                },
            });

            const htmlMessage = `<p>Click the following link to reset your password the link will expire in 5 min:</p>
                                 <p><a href="${message}">${message}</a></p>`;

            const mailOptions = {
                from: process.env.NODEMAILER_USER_EMAIL,
                to: to,
                subject: subject,
                html: htmlMessage,
            };

            await transporter.sendMail(mailOptions);
            return true
        } catch (error) {
            console.error('Error sending email: ', error);
        }
    },

    sendEmail: async (data: emailInfo) => {
        try {
            const { to, subject, message } = data
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.NODEMAILER_USER_EMAIL,
                    pass: process.env.NODEMAILER_PASS,
                },
            });


            const mailOptions = {
                from: process.env.NODEMAILER_USER_EMAIL,
                to: to,
                subject: subject,
                html: `<p>${message}</p>`,
            };

            await transporter.sendMail(mailOptions);
            return true
        } catch (error) {
            console.error('Error sending email: ', error);
        }
    },

    sendRideConfirmEmail: async (info: emailInfo, data: rideConfirmEmailData) => {
        try {
            const { to, subject, message } = info
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.NODEMAILER_USER_EMAIL,
                    pass: process.env.NODEMAILER_PASS,
                },
            });


            const mailOptions = {
                from: process.env.NODEMAILER_USER_EMAIL,
                to: to,
                subject: subject,
                html: rideConfirm(data),
            };

            await transporter.sendMail(mailOptions);
            return true
        } catch (error) {
            console.error('Error sending email: ', error);
        }
    },

    rideRemainderEmail: async (info: emailInfo) => {
        try {
            const { to, subject, message } = info
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.NODEMAILER_USER_EMAIL,
                    pass: process.env.NODEMAILER_PASS,
                },
            });


            const mailOptions = {
                from: process.env.NODEMAILER_USER_EMAIL,
                to: to,
                subject: subject,
                html: `<p>${message}</p>`,
            };

            await transporter.sendMail(mailOptions);
            return true
        } catch (error) {
            console.error('Error sending email: ', error);
        }
    }
}
