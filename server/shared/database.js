const Mongoose = require('mongoose');
const config = require("./config/config");

Mongoose.Promise = global.Promise;
Mongoose.connect(config.mongodb.host, {useNewUrlParser: true});
const db = Mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function callback(){
    console.log("Connection with database successful.");
});

exports.db = db;