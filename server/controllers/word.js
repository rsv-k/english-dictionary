const axios = require('axios');
const Word = require('../models/word');

exports.getTranslations = async (req, res) => {
   const word = req.params.word;

   if (!word) {
      return res.status(400).json({ msg: 'no data provided' });
   }

   try {
      const url = 'http://api.lingualeo.com/gettranslates?word=' + word;
      const data = (await axios.get(url)).data;
      const result = {
         translate: data.translate,
         word: data.word_value
      };

      res.status(200).json({ msg: 'translations fetched successfully', result });
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

      res.status(201).json({ msg: 'word added successfully', words: [word] });
   } catch (err) {
      res.status(500).json({ msg: 'server error' });
   }
};

exports.getWords = async (req, res) => {
   try {
      const setId = req.query.setId || null;
      const options = {};
      if (setId) {
         options.setId = setId;
      }

      const words = await Word.find(options).sort({ createdAt: -1 });

      res.status(200).json({ msg: 'word added successfully', words });
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
      res.status(200).json({ msg: 'word deleted successfully', words: [word] });
   } catch (err) {
      res.status(500).json({ msg: 'server error' });
   }
};

exports.getSpecificWord = async (req, res) => {
   if (!req.params.word) {
      return res.status(400).json({ msg: 'no data provided' });
   }

   try {
      const word = await Word.findOne({ english: req.params.word });
      res.status(200).json({ msg: 'word fetched successfully', words: [word] });
   } catch (err) {
      res.status(500).json({ msg: 'server error' });
   }
};

exports.updateWord = async (req, res) => {
   if (!req.body.word) {
      return res.status(400).json({ msg: 'no data provided' });
   }

   try {
      const word = await Word.findOneAndUpdate({ _id: req.body.word.id }, req.body.word, { new: true });
      res.status(200).json({ msg: 'word fetched successfully', words: [word] });
   } catch (err) {
      res.status(500).json({ msg: 'server error' });
   }
};
