const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = express();
// router
app.get('/', (req, res) => {
   res.send('first CALL');
});

module.exports = app;
