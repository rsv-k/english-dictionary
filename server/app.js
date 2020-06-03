const express = require('express');
const app = express();
const cors = require('cors');
const wordRoutes = require('./routes/word');
const setRoutes = require('./routes/set');

app.use(express.json());
app.use(cors());
app.use('/api/word', wordRoutes);
app.use('/api/set', setRoutes);

module.exports = app;
