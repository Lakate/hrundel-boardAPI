'use strict';

const mongoose = require('./mongooseConnect');
const clearDB = require('./clearDB');

const PullRequest = require('../models/pullRequests');

const testData = require('../testData');

clearDB(() => {
    console.log('clear DB');
});


testData.forEach(pullRequest => {
    let newPR = new PullRequest({
        login: pullRequest.login,
        mentor: pullRequest.mentor,
        number: pullRequest.number,
        pr: pullRequest.pr,
        type: pullRequest.type,
        status: pullRequest.status
    });
    
    newPR.save();
});

console.log('Done!');