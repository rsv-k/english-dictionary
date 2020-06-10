const Word = require('../models/word');
const wordHelper = require('../helpers/wordHelper');

exports.toggleLearnings = async (req, res) => {
   if (!req.body.ids) {
      return res.status(400).json({ msg: 'no data provided' });
   }

   try {
      const options = { _id: req.body.ids };
      if (req.body.reverse) {
         options._id = {
            $nin: req.body.ids
         };
      }
      const opt = wordHelper.chooseGameToLearn(req.body.gameNumber, req.body.option);

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
         { 'learn.wordCards': true }
      ];
      const options = [{
         $match: {
            $or: wordsFrom
         }
      }];
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

      const words = await Word.aggregate(options);

      res.status(200).json({ msg: 'words fetched successfully', result: words });
   } catch (err) {
      console.log(err);
      res.status(500).json({ msg: 'server error', error: err });
   }
};

exports.getRandomTranslations = async (req, res) => {
   if (!req.body.except || req.body.except.length === 0) {
      return res.status(400).json({ msg: 'no data provided' });
   }

   try {
      const words = await Word.aggregate([
         { $match: { russian: { $ne: req.body.except } } },
         { $sample: { size: 4 } }
      ]);
      const translations = words.map(word => word.russian);

      res.status(200).json({ msg: 'translations fetched successfully', translations });
   } catch (err) {
      res.status(500).json({ msg: 'server error', error: err });
   }
};

exports.countWordsInEachGame = async (req, res) => {
   try {
      const wordsQuantity = {
         wordTranslation: await Word.countDocuments({ 'learn.wordTranslation': true }),
         translationWord: await Word.countDocuments({ 'learn.translationWord': true }),
         savannah: await Word.countDocuments({ 'learn.savannah': true }),
         wordConstructor: await Word.countDocuments({ 'learn.wordConstructor': true }),
         listening: await Word.countDocuments({ 'learn.listening': true }),
         wordCards: await Word.countDocuments({ 'learn.wordCards': true })
      };

      res.status(200).json({ msg: 'quantity fetched successfully', result: wordsQuantity });
   } catch (err) {
      res.status(500).json({ msg: 'server error', error: err });
   }
};
