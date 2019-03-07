const League = require("./league.controller");

module.exports = function(socket){

    socket.on('league/create', function(league){
        console.log("create attempted");
        League.createLeague(league).then((response) =>{
            console.log("create success");
            socket.emit("league/create/response", response);
        }).catch((err) =>{
            console.log(err);
            socket.emit("league/create/response", err);
            return err;
        });
    });

    socket.on("league/update", function(league){
        League.updateLeague(league).then((response) => {
            socket.emit("league/update/response", response);
        }).catch((err) => {
            console.log(err);
            socket.emit("league/update/response", err);
            return err;
        });
    });

    socket.on("league/get", function(name){
        League.getLeague(name).then((response) => {
            console.log("getLeague:" + name, response.data.length);
            socket.emit("league/get/response", response);
        }).catch((err) => {
            console.log(err);
            socket.emit("league/get/response", err);
            return err;
        });
    });
};