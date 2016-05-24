'use strict';

const mongoClient = require('mongodb').MongoClient;
const request = require('request');
const log = require('./logger');

const dbUrl = process.env.DB_URL || require('config').get('db.DB_URL');

const Bluebird = require('bluebird');

function getDataFromDB () {
    mongoClient.connect(dbUrl,(err, db) => {
        if (err) {
            log.warn(err);
        } else {
            var collection = db.collection('students');
            collection.find({}).toArray(function (err, result) {
                db.close();
                if (err) {
                    log.warn(err);
                } else {
                    log.debug(result);
                    sendDataToServer(result);
                }
            });
        }
    });
}

function requestToServer (pr, cb) {
    request.post({
        headers: {'content-type' : 'application/json'},
        url: 'http://hrundel-board.herokuapp.com/students/refresh',
        json: pr
    }, (err, res) => {
        if (err) {
            console.error(err);
        } else {
            console.log(res.body);
        }
        cb(err, res);
    });
}


function sendDataToServer (data) {
    let sendPRPromise = Bluebird.promisify(requestToServer);

    Bluebird.mapSeries(data, pr => {
            return sendPRPromise(pr);
        })
        .then(() => { console.log('All done'); })
        .catch(err => log.warn(err));
}

module.exports = getDataFromDB;
