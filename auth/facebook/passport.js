'use strict';

exports.setup = function(User, config){
  var passport = require('passport');
  var FaceBook = require('passport-facebook').Strategy;

  var FaceBookStrat = new FaceBook(config.facebook, fbcb);


  function fbcb(at, rt, prof, done){
    var user = {
      provider: {
        facebook: prof.id
      }
    };

    User.findOrCreateOne({ 'provider.facebook.id': prof.id }, user)
      .then(function(user) {
        done(null, user);
      })
      .fail(done);
  }

  passport.use('facebook', FaceBookStrat);
};
