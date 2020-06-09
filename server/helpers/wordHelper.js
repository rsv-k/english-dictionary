exports.changeVoice = (str, voiceNumber) => {
   if (!str || !voiceNumber || voiceNumber < 0 || voiceNumber > 3) {
      return;
   }

   let before = str.lastIndexOf('v');
   if (before < 0) {
      return;
   }
   before += 3;
   const after = before + 1;
   const between = voiceNumber;

   return str.slice(0, before) + between + str.slice(after);
};

exports.chooseGameToLearn = (gameNumber, option) => {
   const gameOptions = {
      1: 'wordTranslation',
      2: 'translationWord',
      3: 'savannah',
      4: 'wordConstructor',
      5: 'listening',
      6: 'wordCards'
   };
   const opt = {};

   if (gameNumber === 0) {
      Object.values(gameOptions).forEach(gameName => {
         opt['learn.' + gameName] = option;
      });
   } else {
      const game = gameOptions[gameNumber];
      opt['learn.' + game] = option;
   }

   return opt;
};
