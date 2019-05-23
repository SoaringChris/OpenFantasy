let config = module.exports;
let PRODUCTION = process.env.NODE_ENV === "Production";

config.express = {
    port: process.env.PORT || '3000',
    host: 'localhost'
};

config.mongodb ={
    host: process.env.DATABASE_CONNECTION_STRING
};

config.debug = true;
config.bcrypt =
    {
        salt: 10
    };

if(PRODUCTION){
    config.debug = false;
}