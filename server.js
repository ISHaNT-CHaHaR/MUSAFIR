const mongoose = require('mongoose');

const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
   console.log('Uncaught Exception.... Shutting down');
   console.log(err.message, err.name);
   process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

//Connect to DB.
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);

mongoose
   .connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
   })
   .then(() => console.log('DB connection successful!'));

// server started!
const port = process.env.PORT;
const server = app.listen(port, () => {
   console.log(`Running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
   console.log(err.name, err.message); //Safety net.
   console.log('UNHANDLED REJECION.....Shutting down...');
   server.close(() => {
      process.exit(1);
   });
});
