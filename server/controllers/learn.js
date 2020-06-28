const Word = require('../models/word');
const wordHelper = require('../helpers/wordHelper');
const mongoose = require('mongoose');

exports.toggleLearnings = async (req, res) => {
   if (!req.body.ids) {
      return res.status(400).json({ msg: 'no data provided' });
   }
   try {
      const options = { _id: req.body.ids, ownerId: req.userData.id };
      if (req.body.reverse) {
         options._id = {
            $nin: req.body.ids
         };
      }
      const opt = wordHelper.chooseGameToLearn(
         req.body.gameNumber,
         req.body.option
      );

      await Word.update(options, { $set: opt }, { multi: true });

      res.status(200).json({ msg: 'words updated successfully' });
   } catch (err) {
      res.status(500).json({ msg: 'server error' });
   }
};

exports.getWordsToLearn = async (req, res) => {
   try {
      const wordsFrom = [
         { 'learn.wordTranslation': true },
         { 'learn.translationWord': true },
         { 'learn.savannah': true },
         { 'learn.wordConstructor': true },
         { 'learn.listening': true },
         { 'learn.wordCards': true },
         { 'learn.brainstorm': true }
      ];

      const options = [
         {
            $match: {
               $or: wordsFrom
            }
         }
      ];

      if (req.query.fetchFrom && req.query.fetchFrom !== 0) {
         options[0].$match = {
            ...wordsFrom[req.query.fetchFrom - 1]
         };
      }

      if (!req.query.all) {
         options.push({
            $sample: {
               size: 12
            }
         });
      }

      if (req.query.setId) {
         options[0].$match.setId = [mongoose.Types.ObjectId(req.query.setId)];
      }

      options[0].$match.ownerId = mongoose.Types.ObjectId(req.userData.id);
      const words = await Word.aggregate(options);

      res.status(200).json({
         msg: 'words fetched successfully',
         result: words
      });
   } catch (err) {
      res.status(500).json({ msg: 'server error', error: err });
   }
};

exports.getRandomOptions = async (req, res) => {
   if (!req.body.except || req.body.except.length === 0 || !req.body.property) {
      return res.status(400).json({ msg: 'no data provided' });
   }

   try {
      const words = await Word.aggregate([
         { $match: { [req.body.property]: { $ne: req.body.except } } },
         { $sample: { size: 4 } }
      ]);
      const options = words.map(word => word[req.body.property]);

      res.status(200).json({ msg: 'options fetched successfully', options });
   } catch (err) {
      res.status(500).json({ msg: 'server error', error: err });
   }
};

exports.countWordsInEachGame = async (req, res) => {
   try {
      const options = {
         ownerId: req.userData.id
      };
      if (req.query.setId) {
         options.setId = [req.query.setId];
      }

      const wordsQuantity = {
         wordTranslation: await Word.countDocuments({
            'learn.wordTranslation': true,
            ...options
         }),
         translationWord: await Word.countDocuments({
            'learn.translationWord': true,
            ...options
         }),
         savannah: await Word.countDocuments({
            'learn.savannah': true,
            ...options
         }),
         wordConstructor: await Word.countDocuments({
            'learn.wordConstructor': true,
            ...options
         }),
         listening: await Word.countDocuments({
            'learn.listening': true,
            ...options
         }),
         wordCards: await Word.countDocuments({
            'learn.wordCards': true,
            ...options
         }),
         brainstorm: await Word.countDocuments({
            'learn.brainstorm': true,
            ...options
         })
      };

      res.status(200).json({
         msg: 'quantity fetched successfully',
         result: wordsQuantity
      });
   } catch (err) {
      res.status(500).json({ msg: 'server error', error: err });
   }
};
