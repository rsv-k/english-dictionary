const axios = require('axios');

exports.getTranslations = async (req, res) => {
   const word = req.params.word;

   if (!word) {
      return res.status(400).json({ msg: 'no data provided' });
   }

   try {
      const url = 'http://api.lingualeo.com/gettranslates?word=' + word;
      const translations = (await axios.get(url)).data.translate;

      res.status(200).json({ msg: 'translations fetched successfully', translations });
   } catch (err) {
      res.status(500).json({ msg: 'server error' });
   }
};
