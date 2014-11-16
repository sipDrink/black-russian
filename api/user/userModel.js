'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');
var _ = require('lodash');

var UserSchema = new Schema({
  name: String,
  gender: String,
  auth_key: {
    type: String,
    required: true
  },
  provider: {
    facebook: {
      id: String,
      access_token: String
    }
  }
});

UserSchema.statics.findOneOrCreateOne = function(query, maybe) {
  if (!query) {
    throw Error('Must have a query');
  }

  if (typeof query !== 'object') {
    throw Error('Query must be an object');
  }

  if (!maybe) {
    throw Error('You must pass in an user just in case');
  }

  var future = Q.defer();
  var User = mongoose.model('user');

  User.findOne(query, function(err, user) {
    if (err) {
      return future.reject(err);
    }

    if (user && !_.isEmpty(user)) {
      return future.resolve(user);
    }

    User.create(maybe, function(err, user) {
      if (err) {
        future.reject(err);
      } else {
        future.resolve(user);
      }
    });
  });
  return future.promise;
};

module.exports = mongoose.model('user', UserSchema);
