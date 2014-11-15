'use strict';

module.exports = {
  mongo: {
    uri: 'mongodb://localhost/sip-dev'
  },

  facebook: {
    callbackURL: 'http://localhost:' + (process.env.PORT || 8000) + '/auth/facebook/cb'
  }
};
