'use strict';

module.exports = {
  port: process.env.PORT || 8080,
  mongo: {
    uri: process.env.MONGO_URL
  },
  facebook: {
    callbackURL: 'http://localhost/' + process.env.PORT + '/auth/facebook/cb',
  }
};
