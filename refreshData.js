'use strict';

const request = require('request');
const nock = require('nock');
const testDataForDB = require('testData');

nock('http://myapp.iriscouch.com')
    .get('/users')
    .reply(200, {data: testDataForDB});


function getDataFromHrundelAPI () {
    request('http://myapp.iriscouch.com/users', (err, res, body) => {
        if (!err && res.statusCode === 200) {
            sendDataToServer(body);
        } else {
            console.error(err);
        }
    });
}

function sendDataToServer (data) {
    request.post({
        headers: {'content-type' : 'application/json'},
        url: 'http://localhost:5000/students/refresh',
        body: data
    }, (err, res) => {
        console.log(res.body);
    });
}

module.exports = getDataFromHrundelAPI;