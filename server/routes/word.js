const express = require('express');
const router = express.Router();
const wordController = require('../controllers/word');

router.get('/translations/:word', wordController.getTranslations);

module.exports = router;
