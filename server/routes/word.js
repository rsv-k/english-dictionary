const express = require('express');
const router = express.Router();
const wordController = require('../controllers/word');

router.get('/translations/:word', wordController.getTranslations);
router.get('', wordController.getWords);
router.post('', wordController.addWord);
router.delete('/:id', wordController.deleteWord);

module.exports = router;
