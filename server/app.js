const express = require('express');
const app = express();
const wordRoutes = require('./routes/word');
const setRoutes = require('./routes/set');
const learn = require('./routes/learn');
const auth = require('./routes/auth');
const checkAuth = require('./middlewares/check-auth');

app.use(express.json());
app.use('/api/word', checkAuth, wordRoutes);
app.use('/api/set', checkAuth, setRoutes);
app.use('/api/learn', checkAuth, learn);
app.use('/api/auth', auth);

module.exports = app;
