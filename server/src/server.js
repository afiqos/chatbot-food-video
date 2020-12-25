'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan')
const bodyParser = require('body-parser')
// const { mongoClient } = require('./db_connection')
// const mongoUtil = require('./mongoUtil');
// const { mongoClient } = require('./mongoUtil');
const { mySqlClient } = require('./mysql_connection')

const app = express();

app.use(cors())


// mongoUtil.connectToServer( function(err, client) {
//     if (err) throw err;
//     console.log("Connected to DB")

// });

app.get('/', function(req, res) {
    res.send('Welcome kekw');
});

app.get('/test', (req, res) => {

    const queryString = "SELECT * FROM emotions";
    mySqlClient.query(queryString, (err, rows, field) => {
        if (err) {
            console.log("Failed to query")
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("might have fetched data successfully")
        res.json(rows)

    })
});

// probably make these the same as ones in .env?
const PORT = 8000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`)