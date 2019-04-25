/* eslint-disable prefer-destructuring */
import mongoose from 'mongoose'

import db from './db'

const mongooseConnection = db.mongooseConnection

const schema = new mongoose.Schema({
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
})

schema.index({ email: 1 }) // 1 means ascending order sorting

const model = mongooseConnection.model('imageModel', schema)

model.on('index', () => {
  console.log('Image index')
})


export default model
