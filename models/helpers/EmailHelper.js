// models/helpers/EmailHelper.js
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.sendAdminMail = async (data) => {
  const { fullName, email, phone, ageGroup, courseName, paymentScreenshot } = data;
  const filePath = path.join(__dirname, '../../uploads', paymentScreenshot);

  // Verify file exists before attaching
  if (!fs.existsSync(filePath)) {
    throw new Error('Payment screenshot file not found');
  }

  return transporter.sendMail({
    from: `"Kidsmate" <${process.env.MAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `New Registration: ${fullName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Registration Received</h2>
        <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px;">
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Age Group:</strong> ${ageGroup}</p>
          <p><strong>Course:</strong> ${courseName}</p>
        </div>
        <p style="margin-top: 16px;">Payment receipt is attached.</p>
      </div>
    `,
    attachments: [
      {
        filename: paymentScreenshot,
        path: filePath,
      },
    ],
  });
};

exports.sendUserConfirmationMail = async ({ fullName, email, courseName }) => {
  return transporter.sendMail({
    from: `"Kidsmate" <${process.env.MAIL_USER}>`,
    to: email,
    subject: 'Your Registration is in Process',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Registration Received</h2>
        <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px;">
          <p>Hello ${fullName},</p>
          <p>Thank you for registering for <strong>${courseName}</strong>.</p>
          <p>We have received your registration and payment receipt.</p>
          <p>Our team will verify your payment and get back to you shortly.</p>
        </div>
        <p style="margin-top: 16px;">- Kidsmate Team</p>
      </div>
    `,
  });
};