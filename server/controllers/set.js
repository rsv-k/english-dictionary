const Set = require('../models/set');

exports.addSet = async (req, res) => {
   if (!req.body.set) {
      return res.status(400).json({ msg: 'no data provided' });
   }

   try {
      let set = new Set(req.body.set);
      set = await set.save();

      res.status(201).json({ msg: 'set successfully created', sets: [set] });
   } catch (err) {
      res.status(500).json({ msg: 'server error' });
   }
};

exports.getSets = async (req, res) => {
   try {
      const sets = await Set.find();
      res.status(201).json({ msg: 'set successfully created', sets });
   } catch (err) {
      res.status(500).json({ msg: 'server error' });
   }
};

exports.deleteSet = async (req, res) => {
   if (!req.params.id) {
      return res.status(400).json({ msg: 'no data provided' });
   }

   try {
      const set = await Set.findByIdAndDelete(req.params.id);

      res.status(200).json({ msg: 'set deleted successfully', sets: [set] });
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

      res.status(200).json({ msg: 'set edited successfully', sets: [set] });
   } catch (err) {
      res.status(500).json({ msg: 'server error' });
   }
};
