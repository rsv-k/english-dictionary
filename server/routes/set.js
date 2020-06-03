const express = require('express');
const router = express.Router();
const setController = require('../controllers/set');

router.get('', setController.getSets);
router.post('', setController.addSet);
router.delete('/:id', setController.deleteSet);

module.exports = router;
