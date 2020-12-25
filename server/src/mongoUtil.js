const MongoClient = require('mongodb').MongoClient;
// require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
// require('dotenv').config({path: '/Users/afiqos/code/chatbot-food-video/server/src/.env'});

const url = "mongodb://localhost:27017"
const dbName = "chatbotDB101"

// MongoClient.connect(process.env.DB_CONNECTION, {
MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function(err, db) {
    if (err) throw err;
    console.log("MongoDB connection successful");
    
    var dbo = db.db(dbName)

    dbo.collection("chatLogs").findOne({title: "me"}, function(err, result) {
        if (err) throw err;
        console.log("Query pass")
        // if (result !== null) {
        //     console.log(result);
        // } else {
        //     console.log("its null")
        // }
        console.log(result)
   
        
        db.close();
    })
});


module.exports = {
    MongoClient
}



// var _db;
// module.exports = {
//     // mongoClient
//     connectToServer: function (callback) {
//         MongoClient.connect(url, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         }, function (err, client) {
//             _db = client.db(dbName);
//             return callback(err);
//         });
//     },

//     getDb: function() {
//         return _db;
//     }
// };

// mongoUtil.connectToServer( function(err, client) {
//     if (err) throw err;
//     console.log("Connected to DB")

// });