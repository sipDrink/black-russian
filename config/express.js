'use strict';

var morgan        = require('morgan'),
    bodyParser    = require('body-parser'),
    mOverride     = require('method-override'),
    errorHandler  = require('errorhandler'),
    config        = require('./env'),
    passport      = require('passport');


module.exports = function(app) {
  var env = app.get('env');

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(mOverride());
  app.use(passport.initialize());
  app.use(morgan('dev'));
  app.use(errorHandler());
};
