'use strict';

var express = require('express');
var controller = require('./userController');
// var config = require('../../config/env');
var auth = require('../../auth/auth');

var router = express.Router();
router.get('/me', auth.isAuth(), controller.me);

module.exports = router;
