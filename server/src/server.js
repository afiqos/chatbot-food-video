'use strict';

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors())

// probably make these the same as ones in .env?
const PORT = 8000;
const HOST = '0.0.0.0';

app.get('/', function(req, res) {
    res.send('Welcome kekw');
});

app.get('/test', function(req, res) {
    res.send('Response from backend boii');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`)