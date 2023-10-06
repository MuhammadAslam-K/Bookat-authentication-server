import nodemailer from 'nodemailer';


export default {
    sendEmail: async (data: { to: string, subject: string, message: string }) => {
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
    }

}
