'use strict';

const dbURI = 'mongodb://hrundel:hrundelurfu2015@ds013222.mlab.com:13222/test_api';
const mongoose = require('mongoose');

module.exports = done => {
    if (mongoose.connection.readyState === 0) {
        mongoose.connect(dbURI, function (err) {
            if (err) {
                console.error(err);
            }
            return clearDB(done);
        });
    } else {
        return clearDB(done);
    }
};

function clearDB(done) {
    for (let i in mongoose.connection.collections) {
        mongoose.connection.collections[i].remove(() => {});
    }
    return done();
}
