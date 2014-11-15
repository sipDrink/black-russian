'use strict';

module.exports = {
  port: process.env.PORT || 8080,
  mongo: {
    uri: process.env.MONGO_URL
  },
  facebook: {
    callbackURL: 'https://powerful-badlands-7666.herokuapp.com/auth/facebook/cb',
  }
};
