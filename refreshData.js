'use strict';

const request = require('request');
const dbUrl = process.env.DB_URL || require('config').get('db.DB_URL');

const mongoClient = require('mongodb').MongoClient;

function getDataFromDB () {
    mongoClient.connect(dbUrl,(err, db) => {
        if (err) {
            console.error(err);
        } else {
            var collection = db.collection('students');
            collection.find({}).toArray(function (err, result) {
                if (err) {
                    console.error(err);
                } else {
                    sendDataToServer(result);
                }
                db.close();
            });
        }
    });
}

function sendDataToServer (data) {
    request.post({
        headers: {'content-type' : 'application/json'},
        url: 'http://hrundel-board.herokuapp.com/students/refresh',
        json: data
    }, (err, res) => {
        if (err) {
            console.error(err);
        } else {
            console.log(res.body);
        }
    });
}

module.exports = getDataFromDB;
