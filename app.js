const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

const guideRoutes = require('./routers/guideRoutes');

dotenv.config({ path: './config.env' });

const app = express();
if (process.env.NODE_ENV === 'development') {
   app.use(morgan('dev'));
}

app.use(express.json());

app.use((req, res, next) => {
   req.requestTime = new Date().toISOString();
   console.log(req.requestTime);
   next();
});
// router

app.use('/api/v1/guides', guideRoutes);

module.exports = app;
