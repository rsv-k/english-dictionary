const axios = require('axios');
const Word = require('../models/word');
const wordHelper = require('../helpers/wordHelper');

exports.getTranslations = async (req, res) => {
   const word = req.params.word;

   if (!word) {
      return res.status(400).json({ msg: 'no data provided' });
   }

   try {
      const url = 'http://api.lingualeo.com/gettranslates?word=' + word;
      const data = (await axios.get(url)).data;
      const result = {
         translate: data.translate.slice(0, 4),
         sound_url: wordHelper.changeVoice(data.sound_url, 3),
         transcription: data.transcription
      };

      res.status(200).json({
         msg: 'translations fetched successfully',
         result
      });
   } catch (err) {
      res.status(500).json({ msg: 'server error' });
   }
};

exports.addWord = async (req, res) => {
   if (!req.body.word) {
      return res.status(400).json({ msg: 'no data provided' });
   }

   try {
      let word = new Word(req.body.word);
      word = await word.save();

      res.status(201).json({ msg: 'word added successfully', result: [word] });
   } catch (err) {
      res.status(500).json({ msg: 'server error' });
   }
};

exports.getWords = async (req, res) => {
   try {
      const setId = req.query.setId || null;
      const options = { ownerId: req.userData.id };

      if (setId) {
         options.setId = {
            $in: [req.query.setId]
         };
      }

      if (req.query.startsWith) {
         const regex = new RegExp('^' + req.query.startsWith, 'i');
         options.english = regex;
      }

      let startsFrom = 0;
      if (req.query.startsFrom) {
         startsFrom = req.query.startsFrom * 20;
      }

      const words = await Word.find(options)
         .sort({ createdAt: -1 })
         .skip(startsFrom)
         .limit(20);

      res.status(200).json({ msg: 'word added successfully', result: words });
   } catch (err) {
      res.status(500).json({ msg: 'server error' });
   }
};

exports.deleteWord = async (req, res) => {
   if (!req.params.id) {
      return res.status(400).json({ msg: 'no data provided' });
   }

   try {
      const word = await Word.findByIdAndDelete(req.params.id);
      res.status(200).json({
         msg: 'word deleted successfully',
         result: [word]
      });
   } catch (err) {
      res.status(500).json({ msg: 'server error' });
   }
};

exports.getSpecificWord = async (req, res) => {
   if (!req.params.word) {
      return res.status(400).json({ msg: 'no data provided' });
   }

   try {
      const word = await Word.findOne({
         english: new RegExp(req.params.word, 'i'),
         ownerId: req.userData.id
      });
      res.status(200).json({
         msg: 'word fetched successfully',
         result: [word]
      });
   } catch (err) {
      res.status(500).json({ msg: 'server error' });
   }
};

exports.updateWord = async (req, res) => {
   if (!req.body.word) {
      return res.status(400).json({ msg: 'no data provided' });
   }

   try {
      const word = await Word.findOneAndUpdate(
         { _id: req.body.word.id, ownerId: req.userData.id },
         req.body.word,
         { new: true }
      );
      res.status(200).json({
         msg: 'word fetched successfully',
         result: [word]
      });
   } catch (err) {
      res.status(500).json({ msg: 'server error' });
   }
};

exports.deleteMany = async (req, res) => {
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

      if (req.body.setId) {
         await Word.updateMany(options, {
            $pullAll: { setId: [req.body.setId] }
         });
      } else {
         await Word.deleteMany(options);
      }

      res.status(200).json({ msg: 'words deleted successfully' });
   } catch (err) {
      res.status(500).json({ msg: 'server error' });
   }
};
