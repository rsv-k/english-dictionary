const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.signup = async (req, res) => {
   if (!req.body.user) {
      return res.status(400).json({ msg: 'no data provided' });
   }

   try {
      const hashedPassword = await bcrypt.hash(req.body.user.password, 10);
      req.body.user.password = hashedPassword;

      const user = new User(req.body.user);
      await user.save();

      res.status(201).json({ msg: 'user successfully created' });
   } catch (err) {
      res.status(500).json({ msg: 'internal server error', error: err });
   }
};

exports.login = async (req, res) => {
   if (!req.body.user) {
      return res.status(400).json({ msg: 'no data providede' });
   }

   try {
      const user = await User.findOne({ email: req.body.user.email });
      if (!user) {
         return res.status(404).json({ msg: 'user not found' });
      }

      const isPasswordCorrect = await bcrypt.compare(
         req.body.user.password,
         user.password
      );

      if (!isPasswordCorrect) {
         return res.status(404).json({ msg: 'invalid password' });
      }

      res.status(200).json({ msg: 'user found', userId: user._id });
   } catch (err) {
      res.status(500).json({ msg: 'server error', error: err });
   }
};

exports.checkIfTaken = async (req, res) => {
   if (!req.body.username && !req.body.email) {
      res.status(400).json({ msg: 'no data provided' });
   }

   const options = {
      ...req.body
   };

   try {
      const result = await User.findOne(options);
      res.status(200).json({ isPresent: !!result });
   } catch (err) {
      res.status(500).json({ msg: 'internal server error', error: err });
   }
};
