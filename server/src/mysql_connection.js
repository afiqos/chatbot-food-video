const mysql = require('mysql')

const mySqlClient = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'chatbot101_video_api'
})

mySqlClient.connect(function(err) {
    if (err) throw err
    console.log("Connected to MySQL DB")
})

module.exports = {
    mySqlClient
}