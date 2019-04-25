'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getImage = exports.addImage = undefined;

var _image = require('../models/image');

var _image2 = _interopRequireDefault(_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addImage = exports.addImage = function addImage(email, tag, imageKey) {
  return new Promise(function (resolve, reject) {
    var image = new _image2.default({ email: email, tag: tag, imageUrl: imageKey });
    image.save().then(function () {
      return resolve();
    }).catch(function (err) {
      console.log(err);
    });
  });
};

var getImage = exports.getImage = function getImage(email) {
  return new Promise(function (resolve, reject) {
    _image2.default.find({ email: email }).then(function (data) {
      return resolve(data);
    }).catch(function (err) {
      return reject(err);
    });
  });
};