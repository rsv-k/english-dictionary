const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const entryPoint = require('./app');

app.use(entryPoint);

app.listen(PORT, () => {
   console.log('server is running');
});

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log('mongo db is running'));
