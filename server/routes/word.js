const express = require('express');
const router = express.Router();
const wordController = require('../controllers/word');

router.get('/translations/:word', wordController.getTranslations);
router.get('/wordsToLearn', wordController.getWordsToLearn);
router.get('', wordController.getWords);
router.post('', wordController.addWord);
router.delete('/:id', wordController.deleteWord);
router.get('/:word', wordController.getSpecificWord);
router.put('', wordController.updateWord);
router.post('/deleteMany', wordController.deleteMany);
router.post('/setToLearn', wordController.setToLearn);

module.exports = router;
