const express = require('express');
const app = express();
const cors = require('cors');
const wordRoutes = require('./routes/word');

app.use(express.json());
app.use(cors());
app.use('/api/word', wordRoutes);

module.exports = app;
