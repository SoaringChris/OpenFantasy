let config = require("../shared/config/config");

let SOCKET_LIST = {};
const DEBUG = config.debug;
module.exports = function(server){
    let io = require('socket.io')(server, {});

    io.sockets.on('connection', function(socket) {
        socket.id = Math.random().toString();
        console.log("Client connected id:" + socket.id);
        SOCKET_LIST[socket.id] = socket;

        //Socket requirements
        require("./league/league.routes")(socket);

        socket.on("disconnect", function () {
            delete SOCKET_LIST[socket.id];
        });

        socket.on("evalServer", function (data) {
            if (!DEBUG) {
                return;
            }
            let res = eval(data);
            socket.emit("evalAnswer", res);
        });
    });
};