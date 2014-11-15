'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express'),
    mongoose = require('mongoose'),
    config = require('./config/env');

mongoose.connect(config.mongo.uri, config.mongo.options);
var app = express();

require('./config/express')(app);
require('./routes')(app);

app.listen(config.port);
console.log('black-russian on port', config.port);

module.exports = app;
