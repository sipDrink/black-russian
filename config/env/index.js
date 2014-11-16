'use strict';

var _ = require('lodash');

// default config for server
var all = {
  env: process.env.NODE_ENV,

  port: process.env.PORT || 8000,

  // any and all secrets
  secrets: {
    pb: {
      publish_key: process.env.PUBNUB_PUBLISH_KEY || 'demo',
      subscribe_key: process.env.PUBNUB_SUBSCRIBE_KEY ||'demo',
      secret_key: process.env.PUBNUB_SECRET_KEY
    },
    jwt: process.env.JWT_SECRET
  },
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

  facebook: {
    clientID: process.env.FB_APP_ID,
    clientSecret: process.env.FB_APP_SECRET,
    enableProof: false
  },

  google: {

  }
};
// merge config file with default config based off env
module.exports = _.merge(all, require('./' + process.env.NODE_ENV) || {} );
