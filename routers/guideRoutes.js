const express = require('express');

const router = express.Router();

router.route('/nice').get((req, res) => {
   res.send('NICE POST!');
});

router.route('/').get((req, res) => {
   res.send('First Call!');
});

module.exports = router;
