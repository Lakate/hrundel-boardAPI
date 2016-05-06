'use strict';

const mongoose = require('mongoose');
const dbUrl = 'mongodb://hrundel:hrundelurfu2015@ds013222.mlab.com:13222/test_api';

mongoose.connect(dbUrl);
mongoose.connection.on('error', console.error.bind(console, 'connection error'));

module.exports = mongoose;
