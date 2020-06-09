const Word = require('../models/word');
const wordHelper = require('../helpers/wordHelper');

exports.setToLearn = async (req, res) => {
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
      const opt = wordHelper.chooseGameToLearn(req.body.gameNumber);

      await Word.update(options, { $set: opt }, { multi: true });

      res.status(200).json({ msg: 'words updated successfully' });
   } catch (err) {
      res.status(500).json({ msg: 'server error' });
   }
};

exports.getWordsToLearn = async (req, res) => {
   try {
      const options = [{
         $match: {
            $or: [
               { 'learn.wordTranslation': true },
               { 'learn.translationWord': true },
               { 'learn.savannah': true },
               { 'learn.wordConstructor': true },
               { 'learn.listening': true },
               { 'learn.wordCards': true }
            ]
         }
      }];
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
