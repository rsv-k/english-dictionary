const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const entryPoint = require('./app');

app.use(entryPoint);

app.listen(PORT, () => {
   console.log('server is running');
});
