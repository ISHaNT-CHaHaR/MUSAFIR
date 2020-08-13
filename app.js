const express = require('express');
const dotenv = require('dotenv');

const app = express();

app.get('/', (req, res) => {
   res.send('first CALL');
});

// server started!
const port = 3000;
app.listen(port);
