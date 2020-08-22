const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

const guideRoutes = require('./routers/guideRoutes');
const userRoutes = require('./routers/userRoutes');

const appErr = require('./utils/appErr');
const globalHandler = require('./controllers/errorcontroller');

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
app.use('/api/v1/user', userRoutes);

app.all('*', (req, res, next) => {
   next(new appErr(`Can't find ${req.originalUrl} on this Server!`, 404));
});

app.use(globalHandler);

module.exports = app;
