'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pullRequestSchema = new Schema({
    login: String,
    mentor: String,
    number: Number,
    pr: Number,
    type:String,
    status: String
});

module.exports = mongoose.model('Students', pullRequestSchema);
