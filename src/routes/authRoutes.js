const express = require('express');
const { getTestToken } = require('../controllers/authController');

const router = express.Router();

router.get('/token', getTestToken);

module.exports = router;