"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.default = {
    sendEmail: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { to, subject, message } = data;
            const transporter = nodemailer_1.default.createTransport({
                service: 'gmail',
                auth: {
                    user: 'kamuhammadaslam@gmail.com',
                    pass: 'iwnkdbowaiicdwpf',
                },
            });
            const htmlMessage = `<p>Click the following link to reset your password the link will expire in 5 min:</p>
                                 <p><a href="${message}">${message}</a></p>`;
            const mailOptions = {
                from: 'kamuhammadaslam@gmail.com',
                to: to,
                subject: subject,
                html: htmlMessage,
            };
            const info = yield transporter.sendMail(mailOptions);
            console.log('Email sent: ' + info.response);
            return true;
        }
        catch (error) {
            console.error('Error sending email: ', error);
        }
    })
};
