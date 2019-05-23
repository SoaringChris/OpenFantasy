'use strict';
const League = require("./league.model");

exports.createLeague = (league) => {
    console.log("I made it here");
    return new Promise((resolve, reject) =>{
        League.saveLeague(league).then((createdLeague) => {
            let result = {
                statusCode: 200,
                data: createdLeague
            };
            console.log(result);
            resolve(result);

        }).catch((err) => {
            console.error(err);
            let errorResponse = {
                statusCode: 500,
                message: "We ran into an error!"
            };
            reject(errorResponse);
        });
    });
};

exports.updateLeague = (league) => {
    return new Promise((resolve, reject) => {
        League.updateLeague(league).then((updatedLeague) => {
            let result = {
                statusCode: 200,
                data: updatedLeague
            };
            resolve(result);
        }).catch((err) => {
            let errorResponse = {
                statusCode: 500,
                message: "We ran into an error!"
            };
            reject(errorResponse);
        });
    });
};

exports.getLeague = (name) => {
    return new Promise((resolve, reject) => {
        League.loadLeague(name).then((league) => {
            let result = {
                statusCode: 200,
                data: league
            };
            resolve(result);
        }).catch((err) => {
            console.error(err);
            let errorResponse = {
                statusCode: 500,
                message: "We ran into an error!"
            };
            reject(errorResponse);
        });
    });
};