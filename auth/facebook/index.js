'use strict';

var express   = require('express'),
    passport  = require('passport'),
    finishUp  = require('../auth').passTokenToRedirectUrl;

var router = express.Router();

router
  .get('/', passport.authenticate('facebook', {
    failureRedirect: '/auth/close',
    session: false
  }))
  .get('/cb', passport.authenticate('facebook', {
    failureRedirect: '/auth/close',
    session: false
  }), finishUp);

module.exports = router;
