const express = require('express');
const router = express.Router();
const learnController = require('../controllers/learn');

router.post('', learnController.setToLearn);
router.get('', learnController.getWordsToLearn);
router.post('', learnController.getRandomTranslations);

module.exports = router;
