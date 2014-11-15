'use strict';

exports.setup = function(User, config){
  var passport = require('passport');
  var FaceBook = require('passport-facebook').Strategy;

  var FaceBookStrat = new FaceBook(config.facebook, fbcb);

  function fbcb(at, rt, prof, done){
    User.findOne({ 'provider.facebook.id': profile.id })
  }
};
