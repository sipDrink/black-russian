'use strict';

exports.setup = function(User, config){
  var passport = require('passport');
  var FaceBook = require('passport-facebook').Strategy;

  var FaceBookStrat = new FaceBook(config.facebook, fbcb);


  function fbcb(at, rt, prof, done){
    var user = {
      name: prof._json.first_name,
      gender: prof.gender,
      provider: {
        facebook: {
          id: prof.id,
          access_token: at
        }

      }
    };

    User.findOneOrCreateOne({ 'provider.facebook.id': prof.id }, user)
      .then(function(user) {
        done(null, user);
      })
      .fail(done);
  }

  passport.use('facebook', FaceBookStrat);
};
