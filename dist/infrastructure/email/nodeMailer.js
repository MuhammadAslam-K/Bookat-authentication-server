"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const rideConfirm_email_template_1 = require("./template/rideConfirm-email-template");
exports.default = {
    sendLink: async (data) => {
        try {
            const { to, subject, message } = data;
            const transporter = nodemailer_1.default.createTransport({
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
            return true;
        }
        catch (error) {
            console.error('Error sending email: ', error);
        }
    },
    sendEmail: async (data) => {
        try {
            const { to, subject, message } = data;
            const transporter = nodemailer_1.default.createTransport({
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
            return true;
        }
        catch (error) {
            console.error('Error sending email: ', error);
        }
    },
    sendRideConfirmEmail: async (info, data) => {
        try {
            const { to, subject, message } = info;
            const transporter = nodemailer_1.default.createTransport({
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
                html: (0, rideConfirm_email_template_1.rideConfirm)(data),
            };
            await transporter.sendMail(mailOptions);
            return true;
        }
        catch (error) {
            console.error('Error sending email: ', error);
        }
    },
    rideRemainderEmail: async (info) => {
        try {
            const { to, subject, message } = info;
            const transporter = nodemailer_1.default.createTransport({
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
            return true;
        }
        catch (error) {
            console.error('Error sending email: ', error);
        }
    }
};
