const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
   try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN);
      req.userData = decodedToken;
      next();
   } catch (err) {
      res.status(401).json({ msg: 'Auth failed' });
   }
};
