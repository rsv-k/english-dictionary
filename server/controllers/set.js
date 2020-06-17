const Set = require('../models/set');
const Word = require('../models/word');

exports.addSet = async (req, res) => {
   if (!req.body.set) {
      return res.status(400).json({ msg: 'no data provided' });
   }

   try {
      let set = new Set(req.body.set);
      set = await set.save();

      res.status(201).json({ msg: 'set successfully created', result: [set] });
   } catch (err) {
      res.status(500).json({ msg: 'server error' });
   }
};

exports.getSets = async (req, res) => {
   try {
      const sets = await Set.find({ ownerId: req.userData.id });
      res.status(201).json({ msg: 'set successfully created', result: sets });
   } catch (err) {
      res.status(500).json({ msg: 'server error' });
   }
};

exports.deleteSet = async (req, res) => {
   if (!req.params.id) {
      return res.status(400).json({ msg: 'no data provided' });
   }

   try {
      await Word.updateMany(
         {
            setId: {
               $in: [req.params.id]
            }
         },
         {
            $pullAll: {
               setId: [req.params.id]
            }
         }
      );
      const set = await Set.findByIdAndDelete(req.params.id);

      res.status(200).json({ msg: 'set deleted successfully', result: [set] });
   } catch (err) {
      res.status(500).json({ msg: 'server error' });
   }
};

exports.editSet = async (req, res) => {
   if (!req.body.set) {
      return res.status(400).json({ msg: 'no data provided' });
   }

   try {
      let set = await Set.findOne({ _id: req.body.set.id });
      set.title = req.body.set.title;
      set = await set.save();

      res.status(200).json({ msg: 'set edited successfully', result: [set] });
   } catch (err) {
      res.status(500).json({ msg: 'server error' });
   }
};

exports.addWords = async (req, res) => {
   if (!req.body.ids || !req.body.setId) {
      return res.status(400).json({ msg: 'no data provided' });
   }

   try {
      const options = { _id: req.body.ids };
      if (req.body.reverse) {
         options._id = {
            $nin: req.body.ids
         };
      }
      options.setId = {
         $nin: [req.body.setId]
      };

      await Word.updateMany(options, { $push: { setId: req.body.setId } });

      res.status(202).json({ msg: 'words added successfully' });
   } catch (err) {
      res.status(500).json({ msg: 'server error' });
   }
};
