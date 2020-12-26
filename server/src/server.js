'use strict';

const SUCCESS = "success";
const FAILURE = "failure";

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

app.get('/', function (req, res) {
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

app.post('/sendEmotion', (req, res) => {
    const userInput = req.body.messageInput.toLowerCase();
    console.log(`userInput: ${userInput}`);

    var emotionResponse;
    switch (userInput) {
        case "happy":
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
                emotionResponse = SUCCESS;
                YoutubeInputs.categoryId = categoryId;
                res.json({ botOutput: emotionResponse });
            });
            break;

        case "sad":
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
                emotionResponse = SUCCESS;
                YoutubeInputs.categoryId = categoryId;
                res.json({ botOutput: emotionResponse });
            });
            break;

        default:
            console.log("Emotion not understood");
            emotionResponse = FAILURE;
            res.json({ botOutput: emotionResponse });
            return;
    }

});

app.post('/sendFood', (req, res) => {
    const userInput = req.body.messageInput.toLowerCase().trim().replace(/\s/g, '_');
    console.log(`userInput: ${userInput}`);

    switch (userInput) {
        case "apple":
            const queryString = "SELECT duration_sec FROM food_yt_api INNER JOIN"
                + " food ON food_yt_api.food_id = food.food_id"
                + " AND food.food_name = ?;"

            mySqlClient.query(queryString, [userInput], (err, result, fields) => {
                if (err) {
                    console.log("Failed to query for duration: " + err);
                    res.sendStatus(500);
                    res.end();
                    return;
                }

                const videoDuration = result[0].duration_sec;
                console.log(`Fetched duration_sec: ${videoDuration}`);
                console.log(`categoryId: ${YoutubeInputs.categoryId}`)
                
                // perform youtube api query

            });
            break;

        case "ice_cream":
            const queryString2 = "SELECT duration_sec FROM food_yt_api INNER JOIN"
                + " food ON food_yt_api.food_id = food.food_id"
                + " AND food.food_name = ?;"

            mySqlClient.query(queryString2, [userInput], (err, result, fields) => {
                if (err) {
                    console.log("Failed to query for duration: " + err);
                    res.sendStatus(500);
                    res.end();
                    return;
                }

                const videoDuration = result[0].duration_sec;
                console.log(`Fetched duration_sec: ${videoDuration}`);
                console.log(`categoryId: ${YoutubeInputs.categoryId}`)

                // perform youtbe api query

            });
            break;

        default:
            console.log("Food not understood");
            foodResponse = FAILURE;
            res.json({ botOutput: foodResponse });
    }

});

const getCategoryId = (emotion) => {

}

// probably make these the same as ones in .env?
const PORT = 8000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`)

let YoutubeInputs = class {
    constructor(categoryId, videoDuration) {
        this.categoryId = categoryId;
        this.videoDuration = videoDuration;
    }

    set categoryId(id) {
        this.categoryId = id;
    }

    get categoryId() {
        return this.categoryId;
    }

    set videoDuration(duration) {
        this.videoDuration = duration;
    }

    get videoDuration() {
        return this.videoDuration;
    }
};