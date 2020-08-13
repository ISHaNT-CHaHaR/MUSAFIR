const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

//Connect to DB.
const DB = process.env.DATABASE.replace(
   '<PASSWORD>',
   { useNewUrlParser: true },
   process.env.PASSWORD
);

mongoose.connect(DB, () => {
   console.log('DB DONE!');
});

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
