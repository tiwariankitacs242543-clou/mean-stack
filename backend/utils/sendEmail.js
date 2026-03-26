const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // 1. Create a transporter (the "sender" configuration)
    const transporter = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // 2. Define the email details
    const mailOptions = {
        from: 'Expense Tracker <no-reply@expensetracker.com>',
        to: options.email,
        subject: options.subject,
        text: options.message // This will contain your reset token
    };

    // 3. Send the email
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;