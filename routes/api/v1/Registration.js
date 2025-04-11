const express = require('express');
const router = express.Router();
const upload = require('../../../models/helpers/UploadReceipt');
const { registerUser } = require('../../../controllers/api/v1/Registration');

// POST /api/v1/register
router.post('/', upload.single('paymentScreenshot'), registerUser);

module.exports = router;
