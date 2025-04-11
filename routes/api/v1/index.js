const express = require('express');

const router = express.Router();

const RegistrationRoutes = require('./registration');

// All routes under /api/v1/...
router.use('/register', RegistrationRoutes);

module.exports = router;
