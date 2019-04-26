'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _config = require('./config/config.json');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*eslint-disable */

global = {};
/* eslint-enable */

global.env = process.env.NODE_ENV || 'development';
global.config = _config2.default[global.env];

console.log(global.config);

var app = (0, _express2.default)();

app.use(_bodyParser2.default.json({ limit: '10mb' }));

app.use(_bodyParser2.default.urlencoded({ extended: false }));

// logs the request
app.use(function (req, res, next) {
  console.log(req.body);
  next();
});

app.use((0, _cors2.default)());

// Controllers
app.use(_routes2.default);

// Host
var port = global.config.serverInfo.port;


app.listen(port, function () {
  console.log('App running on port ' + port);
});

exports.default = app;