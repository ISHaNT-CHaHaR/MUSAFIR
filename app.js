const express = require('express');
const dotenv = require('dotenv');

const guideRoutes = require('./routers/guideRoutes');

dotenv.config({ path: './config.env' });

const app = express();

app.use(express.json());

// router

app.use('/api/v1/guides', guideRoutes);

module.exports = app;
