'use strict';

var expressJWT  = require('express-jwt'),
    compose     = require('composable-middleware'),
    User        = require('../api/user/userModel'),
    config      = require('../config/env'),
    _           = require('lodash'),
    jwt         = require('jsonwebtoken'),
    validateJWT = expressJWT({ secret: config.secrets.jwt });

function isAuth(){
  return compose()
    .use(function(req, res, next) {
      if (req.query && req.query.hasOwnProperty('access_token')) {
        // express jwt looks at req.headers.auhtorization for the jwt
        // check to see if the token is on the query string and add
        // it to the headers, prefix with 'Bearer'
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJWT(req, res, next);
    })
    .use(function(req, res, next) {
      User.findById(req.user._id)
        .then(function(user) {
          if (!user || _.isEmpty(user)) {
            return res.send(401);
          }

          req.user = user;
          next();
        })
        .fail(function(e) {
          next(e);
        });
    });
}

function signToken(id) {
  return  jwt.sign({ _id: id }, config.secrets.jwt, { expiresInMinutes: 60*24*7 /* a week */ });
}


/*
  Hybrid app uses a popup window for the auth flow.
  the app will watch the popup windows url for changes
  and clues what to do next. We cant 'send' the token back to the
  client because the client didn't request it (could use PubNub for this)
  so we add it to the url on a fake redirect, client will parse it from there
*/
function passTokenToRedirectUrl(req, res, next) {
  if (!req.user) {
    var e = new Error('No user');
    e.whatType = 'Auth';
    next(e);
  }

  var token = signToken(req.user._id);
  var user = req.user;
  var cookie = { token: token, user: user };
  res.cookie('__sip', JSON.stringify(cookie));
  res.redirect('/auth?token=' + token);
}

exports.isAuth = isAuth;
exports.sign = signToken;
exports.passTokenToRedirectUrl = passTokenToRedirectUrl;
