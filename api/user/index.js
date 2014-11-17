'use strict';

// var express = require('express');
// var controller = require('./userController');
// // var config = require('../../config/env');
// var auth = require('../../auth/auth');

// var router = express.Router();
// router.get('/me', auth.isAuth(), controller.me);

var userEvents = require('./userEvents');
var _ = require('lodash');

module.exports = function(PN, user){
  var channel = 'private-'+user._id;
  PN.grant({
    channel: channel,
    auth_key: user.auth_key,
    read: true,
    write: true,
    ttl: 0,
    callback: function(m){
      console.log('grant', m);
    }
  });

  PN.subscribe({
    channel: channel,
    message: function(actions){
      _.forEach(actions, function(action, args) {
        userEvents[action](args);
      });
    },
    error: function(e){
      console.error(e);
    }
  });

  PN.publish({
    channel: channel,
    message: { updated: 'yess sir' }
  });
};
