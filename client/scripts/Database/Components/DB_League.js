let DB_League = function(socket){
    let self = {};
    let saveCallback = null;
    let updateCallback = null;
    let getCallback = null;

    self.initialize = function(){
        socket.on("league/create/response", function(response) {
            saveCallback(response);
        });

        socket.on("league/update/response", function(response) {
            updateCallback(response);
        });

        socket.on("league/get/response", function(response) {
            getCallback(response);
        });
    };

    self.save = function(league, callback){
        saveCallback = function(response){
            if(response.data){
                callback(null, response.data)
            } else{
                let err = "league create unsuccessful";
                console.log(err);
                callback(err, null);
            }
        };

        socket.emit("league/create", league)
    };

    self.update = function(league, callback){

        updateCallback = function(response){
            if(response.data){
                callback(null, response.data)
            }else{
                let err = "League could not update";
                console.error(err);
                callback(err, null);
            }
        };

        socket.emit("league/update", league);
    };

    self.getAllLeagues = function( cb) {
        let i = 0;
        let allFunctionsReturned = function () {
            if (i > 2) {
                if (cb) cb();
            }
        };
        i++;

        self.getLeague(function (err, league) {
            if (err) {
                console.error(err);
            } else {
                localStorage.setItem("SurvivorLeague", JSON.stringify(league));
            }

            allFunctionsReturned();
        });
    };

    self.getLeague = function(callback){
        getCallback = function(response){
            if(response.data) {
                callback(null, response.data)
            }
            else
            {
                let err = "Get league failed";
                console.error(err);
                callback(err, null);
            }
        };

        socket.emit("league/get");
    };

    self.initialize();

    return self;

};