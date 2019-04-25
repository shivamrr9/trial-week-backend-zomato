'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dbURI = 'mongodb://localhost/zomatoTrial'; // code for connecting to db


var options = { user: '', pass: '' };
var mongooseConnection = _mongoose2.default.createConnection(dbURI, options);

process.on('SIGINT', function () {
  mongooseConnection.close(function () {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});

mongooseConnection.on('error', function (err) {
  console.log('mongoose error ' + err);
});

mongooseConnection.on('open', function () {
  console.log('mongoose connection open');
});

mongooseConnection.on('connected', function () {
  console.log('mongoose connected to database ' + dbURI);
});

mongooseConnection.on('disconnected', function () {
  console.log('mongoose disconnected');
});

exports.default = { mongooseConnection: mongooseConnection };