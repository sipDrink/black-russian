'use strict';

var User = require('./userModel');
var _ = require('lodash');
module.exports = {
  'update': function(values, PN){
    var id = values._id;
    delete values._id;

    User.findByIdAndUpdate(id, values)
    .then(function(user) {
      PN.publish({
        channel: 'private-'+id,
        message: { 'updated': user }
      });
    })
    .fail(function(error){
      console.error(error);
    });
  }
};
