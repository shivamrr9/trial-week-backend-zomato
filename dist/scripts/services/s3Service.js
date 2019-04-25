'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadS3Object = exports.getS3Object = undefined;

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s3 = new _awsSdk2.default.S3({
  accessKeyId: 'AKIA4PKW7FHBG7455WIJ',
  secretAccessKey: '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'
});

var getS3Object = exports.getS3Object = function getS3Object(_ref) {
  var key = _ref.key;
  return new Promise(function (resolve, reject) {
    var params = {
      Bucket: 'zomato-trial-week',
      Key: key
    };

    s3.getObject(params, function (err, data) {
      if (err) reject(err);else {
        resolve(data);
      }
    });
  });
};

// returns the uploaded object's public url
// upload is a very powerful s3 function can use streams and retries if a request fail
var uploadS3Object = exports.uploadS3Object = function uploadS3Object(_ref2) {
  var key = _ref2.key,
      body = _ref2.body,
      ACL = _ref2.ACL;
  return new Promise(function (resolve, reject) {
    var type = body.split(';')[0].split('/')[1];
    var base64Data = Buffer.from(body.replace(/^data:image\/\w+;base64,/, ''), 'base64');

    var params = {
      Bucket: 'zomato-trial-week',
      Key: key + '.' + type,
      Body: base64Data,
      ACL: ACL,
      ContentEncoding: 'base64',
      ContentType: 'image/' + type
    };

    s3.upload(params, function (err, data) {
      if (err) reject(err);else {
        resolve(data.Location);
      }
    });
  });
};