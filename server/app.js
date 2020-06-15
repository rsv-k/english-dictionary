const express = require('express');
const app = express();
const wordRoutes = require('./routes/word');
const setRoutes = require('./routes/set');
const learn = require('./routes/learn');

app.use(express.json());
app.use('/api/word', wordRoutes);
app.use('/api/set', setRoutes);
app.use('/api/learn', learn);

module.exports = app;
