const express = require('express');
const router = express.Router();
const learnController = require('../controllers/learn');

router.post('', learnController.toggleLearnings);
router.get('', learnController.getWordsToLearn);
router.get('/quantity', learnController.countWordsInEachGame);
router.post('/randomOptions', learnController.getRandomOptions);

module.exports = router;
