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

      res.status(201).json({ msg: 'word added successfully', word });
   } catch (err) {
      res.status(500).json({ msg: 'server error' });
   }
};

exports.getWords = async (req, res) => {
   try {
      const words = await Word.find();

      res.status(201).json({ msg: 'word added successfully', words });
   } catch (err) {
      res.status(500).json({ msg: 'server error' });
   }
};

exports.deleteWord = async (req, res) => {
   if (!req.params.id) {
      return res.status(400).json({ msg: 'no data provided' });
   }

   try {
      await Word.findByIdAndDelete(req.params.id);
      res.status(200).json({ msg: 'word deleted successfully' });
   } catch (err) {
      res.status(500).json({ msg: 'server error' });
   }
};
