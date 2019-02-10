let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");


let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../client")));

app.get('*', function(req, res){
    let clientPath = "/../client/index.html";
    res.sendFile(path.join(__dirname + clientPath))
});

let server = require("./server")(app);

module.exports = app;