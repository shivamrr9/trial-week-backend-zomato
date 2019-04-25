'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable prefer-destructuring */
var mongooseConnection = _db2.default.mongooseConnection;

var schema = new _mongoose2.default.Schema({
  imageUrl: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  tag: {
    type: Array,
    required: false
  }
});

schema.index({ email: 1 }); // 1 means ascending order sorting

var model = mongooseConnection.model('imageModel', schema);

model.on('index', function () {
  console.log('Image index');
});

exports.default = model;