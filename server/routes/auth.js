const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/isTaken', authController.checkIfTaken);
router.post('/refreshTokens', authController.refreshTokens);

module.exports = router;
