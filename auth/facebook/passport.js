'use strict';
var PN = require('pubnub').init(require('../../config/env').secrets.pb);

exports.setup = function(User, config){
  var passport = require('passport');
  var FaceBook = require('passport-facebook').Strategy;
  var FaceBookStrat = new FaceBook(config.facebook, fbcb);

  function fbcb(at, rt, prof, done){
    var user = {
      name: prof._json.first_name,
      gender: prof.gender,
      auth_key: prof._json.first_name + '-' + prof.id,
      provider: {
        facebook: {
          id: prof.id,
          access_token: at
        }
      }
    };

    User.findOneOrCreateOne({ 'provider.facebook.id': prof.id }, user)
      .then(function(user) {
        PN.grant({
          channel: 'private-' + user._id,
          auth_key: user.auth_key,
          read: true,
          write: true,
          ttl: 0,
          callback: function(m){
            console.log('grant callback', m);
          }
        });
        done(null, user);
      })
      .fail(done);
  }

  passport.use('facebook', FaceBookStrat);
};
