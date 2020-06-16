const jwt = require('jsonwebtoken');

exports.generateAccessToken = user => {
   const payload = {
      email: user.email,
      username: user.username,
      id: user._id
   };

   const accessTokenExpiration = 60 * 60;
   const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, {
      expiresIn: accessTokenExpiration
   });

   return {
      accessToken,
      accessTokenExpiration
   };
};
