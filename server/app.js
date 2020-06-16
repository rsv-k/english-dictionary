const express = require('express');
const app = express();
const wordRoutes = require('./routes/word');
const setRoutes = require('./routes/set');
const learn = require('./routes/learn');
const auth = require('./routes/auth');

app.use(express.json());
app.use('/api/word', wordRoutes);
app.use('/api/set', setRoutes);
app.use('/api/learn', learn);
app.use('/api/auth', auth);

module.exports = app;
