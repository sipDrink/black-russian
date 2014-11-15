'use strict';

var express   = require('express'),
    passport  = require('passport'),
    auth      = require('../auth');

var router = express.Router();

router
  .get('/', passport.authenticate('facebook', {
    failureRedirect: '/auth/close',
    session: false
  }))
  .get('/cb', passport.authenticate('facebook', {
    failureRedirect: '/auth/close',
    session: false
  }), auth.noop);

module.exports = router;
