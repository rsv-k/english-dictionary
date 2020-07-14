const jwt = require('jsonwebtoken');

exports.getTokensAndIn = user => {
   return {
      ...generateAccessToken(user),
      ...generateRefreshToken(user),
      userId: user._id
   };
};

function generateAccessToken(user) {
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
}

function generateRefreshToken(user) {
   const payload = {
      email: user.email,
      id: user._id
   };

   const refreshTokenExpiration = 24 * 60 * 60;
   const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN, {
      expiresIn: refreshTokenExpiration
   });

   return {
      refreshToken,
      refreshTokenExpiration
   };
}
