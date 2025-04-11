// controllers/api/v1/Registration.js
const path = require("path");
const fs = require("fs");
const {
  sendAdminMail,
  sendUserConfirmationMail,
} = require("../../../models/helpers/EmailHelper");
const { createRegistration } = require("../../../models/repositories/registration");

exports.registerUser = async (req, res, next) => {
  try {
    const { fullName, email, phone, ageGroup, courseName } = req.body;
    const paymentScreenshot = req.file;

    if (!paymentScreenshot) {
      return res.status(400).json({ 
        success: false,
        message: "Payment screenshot is required" 
      });
    }

    // Create registration
    const result = await createRegistration({
      fullName,
      email,
      phone,
      ageGroup,
      courseName,
      paymentScreenshot: paymentScreenshot.filename,
    });

    if (!result.success) {
      // Clean up uploaded file
      fs.unlinkSync(paymentScreenshot.path);
      return res.status(409).json({ 
        success: false,
        message: result.message 
      });
    }

    // Send emails
    try {
      await sendAdminMail({
        fullName,
        email,
        phone,
        ageGroup,
        courseName,
        paymentScreenshot: paymentScreenshot.filename,
      });

      await sendUserConfirmationMail({ fullName, email, courseName });

      return res.status(201).json({ 
        success: true,
        message: "Registration successful",
        data: result.data 
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Registration succeeded but email failed
      return res.status(201).json({
        success: true,
        message: "Registration completed but email notification failed",
        data: result.data
      });
    }
  } catch (error) {
    console.error("Registration Error:", error);
    // Clean up file if error occurs
    if (req.file) fs.unlinkSync(req.file.path);
    next(error); // Pass to error handling middleware
  }
};