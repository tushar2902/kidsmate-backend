const express = require('express');

const router = express.Router();

const RegistrationRoutes = require('./Registration');

// All routes under /api/v1/...
router.use('/register', RegistrationRoutes);

module.exports = router;
