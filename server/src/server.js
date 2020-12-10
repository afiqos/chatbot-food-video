'use strict';

const express = require('express');
const app = express();

// probably make these the same as ones in .env?
const PORT = 8000;
const HOST = '0.0.0.0';

app.get('/', function(req, res) {
    res.send('Welcome kekw');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`)