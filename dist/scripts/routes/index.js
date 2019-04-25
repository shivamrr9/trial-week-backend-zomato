'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _imageRoute = require('./imageRoute');

var _imageRoute2 = _interopRequireDefault(_imageRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/imageRouter', _imageRoute2.default);

router.get('/', function (req, res) {
  return res.send('Index');
});

exports.default = router;