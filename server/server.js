const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const path = require('path');

if (process.env.NODE_ENV !== 'production') {
   require('dotenv').config();
}

const PORT = process.env.PORT || 3000;
const entryPoint = require('./app');

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
   windowMs: 10 * 60 * 1000, // 10 min
   max: 100
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

app.use(entryPoint);

if (process.env.NODE_ENV === 'production') {
   app.use('/', express.static(path.join(__dirname, 'client')));

   app.use((req, res, next) => {
      res.sendFile(path.join(__dirname, 'client', 'index.html'));
   });
}

app.listen(PORT, () => {
   console.log('server is running');
});

mongoose
   .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
   })
   .then(() => console.log('mongo db is running'));
