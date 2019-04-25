'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _s3Service = require('../services/s3Service');

var _index = require('../controllers/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// upload image to s3...response is image url
router.post('/uploadImage', function (req, res, next) {
  var promiseArr = [];
  req.body.image.forEach(function (image) {
    var uuid = (0, _v2.default)();
    promiseArr.push((0, _s3Service.uploadS3Object)({
      key: uuid,
      body: image,
      ACL: 'public-read'
    }));
  });

  Promise.all(promiseArr).then(function (imageKeys) {
    imageKeys.forEach(function (imageKey) {
      (0, _index.addImage)(req.body.email, req.body.tag, imageKey);
    });
  });

  res.send({ message: 'success' });
});

router.post('/getImage', function (req, res, next) {
  (0, _index.getImage)(req.body.email).then(function (data) {
    return res.send(data);
  }).catch(function (err) {
    return res.status(400).send(err);
  });
});

exports.default = router;