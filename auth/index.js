'use strict';

var express     = require('express'),
    config      = require('../config/env'),
    User        = require('../api/user/userModel');

require('./facebook/passport').setup(User, config);

var router = express.Router();

router.use('/facebook', require('./facebook'));
router.get('/close', function(req, res) {
  res.sendfile('authClose.html');
});

module.exports = router;
