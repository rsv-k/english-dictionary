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
