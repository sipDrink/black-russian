'use strict';

var express     = require('express'),
    passport    = require('passport'),
    config      = require('../config/env'),
    User        = require('../api/user/userModel');

require('./facebook/passport').setup(User, config);

var router = express.Router();

router.use('/facebook', require('./facebook'));

module.exports = router;
