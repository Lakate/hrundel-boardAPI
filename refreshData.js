'use strict';

const bunyan = require('bunyan');

function resSerializer(res) {
    return {
        statusCode: res.statusCode,
        body: res.body,
        request: {
            href: res.request.href,
            method: res.request.method,
            headers: res.request.headers
        }
    };
}

const log = bunyan.createLogger({
    name: 'myapp',
    serializers: {
        res: resSerializer,
        err: bunyan.stdSerializers.err      // standard bunyan error serializer
    }
});

const mongoClient = require('mongodb').MongoClient;
const request = require('request');

const dbUrl = process.env.DB_URL || require('config').get('db.DB_URL');
log.info(dbUrl);

function getDataFromDB () {
    mongoClient.connect(dbUrl,(err, db) => {
        if (err) {
            log.warn(err);
        } else {
            var collection = db.collection('students');
            collection.find({}).toArray(function (err, result) {
                if (err) {
                    log.warn(err);
                } else {
                    log.debug(result);
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
            log.warn(err);
        } else {
            log.info({res});
        }
    });
}

module.exports = getDataFromDB;
