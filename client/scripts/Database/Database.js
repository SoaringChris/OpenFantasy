let Database = function(socket){
    let self = {};

    self.initialize = function(){
        self.league = new DB_League(socket);
    };

    self.initialize();

    return self;
};