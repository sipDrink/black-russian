'use strict';

module.exports = {
  port: process.env.PORT || 8080,
  mongo: {
    uri: process.MONGO_URL
  }
};
