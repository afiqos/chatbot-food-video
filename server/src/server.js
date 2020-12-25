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
app.use(bodyParser.json());

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

app.post('/sendMessage', (req, res) => {
    // read in "input" from json
    const userInput = req.body.messageInput.toLowerCase();
    console.log(`userInput: ${userInput}`);

    var emotionResponse
    // decide what to do with user input
    switch(userInput) {
        case "happy":
            emotionResponse = "you are happy";
            // categoryId = getCategoryId(userInput);
            // can lookup how to get value from async call and clean code into a function
            const queryString = "SELECT category_id FROM emotions_yt INNER JOIN"
                                + " emotions ON emotions.emotion_id = emotions_yt.emotion_id"
                                + " AND emotions.emotion_name = ?;"

            mySqlClient.query(queryString, [userInput], (err, result, fields) => {
                if (err) {
                    console.log("Failed to query for categoryId: " + err);
                    res.sendStatus(500);
                    res.end();
                    return;
                }
                
                const categoryId = result[0].category_id;
                console.log(`Fetched categoryId: ${categoryId}`);
                
                res.json([{botOutput: emotionResponse, categoryId: categoryId}]);
            });
            break;

        case "sad": 
            emotionResponse = "you are sad";
            const queryString2 = "SELECT category_id FROM emotions_yt INNER JOIN"
                                + " emotions ON emotions.emotion_id = emotions_yt.emotion_id"
                                + " AND emotions.emotion_name = ?;"

            mySqlClient.query(queryString2, [userInput], (err, result, fields) => {
                if (err) {
                    console.log("Failed to query for categoryId: " + err);
                    res.sendStatus(500);
                    res.end();
                    return;
                }
                
                const categoryId = result[0].category_id;
                console.log(`Fetched categoryId: ${categoryId}`);
                
                res.json([{botOutput: emotionResponse, categoryId: categoryId}]);
            });
            break;

        default:
            emotionResponse = "Emotion not found";
    }

    // send out "botOutput": "___data___" as response
    // res.json([{botOutput: emotionResponse, category_id: categoryId}]);
});

const getCategoryId = (emotion) => {
    
}

// probably make these the same as ones in .env?
const PORT = 8000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`)