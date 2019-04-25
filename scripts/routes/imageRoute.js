import express from 'express'
import uuidv4 from 'uuid/v4'

import {
  uploadS3Object
} from '../services/s3Service'
import {
  addImage,
  getImage
} from '../controllers/index'


const router = express.Router()

// upload image to s3...response is image url
router.post('/uploadImage', (req, res, next) => {
  const promiseArr = []
  req.body.image.forEach(image => {
    const uuid = uuidv4()
    promiseArr.push(uploadS3Object({
      key: uuid,
      body: image,
      ACL: 'public-read'
    }))
  });

  Promise.all(promiseArr)
    .then((imageKeys) => {
      imageKeys.forEach((imageKey) => {
        addImage(req.body.email, req.body.tag, imageKey)
      })
    })

  res.send({
    message: 'success'
  })
})


router.post('/getImage', (req, res, next) => {
  getImage(req.body.email)
    .then((data) => res.send(data))
    .catch((err) => res.status(400).send(err))
})

export default router