const axios = require('axios');

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
