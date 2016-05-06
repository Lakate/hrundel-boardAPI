'use strict';

const request = require('request');

const mongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb://hrundel:hrundelurfu2015@ds013222.mlab.com:13222/test_api';

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
        url: 'http://localhost:5000/students/refresh',
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
