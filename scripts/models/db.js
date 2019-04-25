// code for connecting to db
import mongoose from 'mongoose'

const dbURI = 'mongodb://localhost/zomatoTrial'

const options = { user: '', pass: '' }
const mongooseConnection = mongoose.createConnection(dbURI, options)


process.on('SIGINT', () => {
  mongooseConnection.close(() => {
    console.log('Mongoose disconnected through app termination')
    process.exit(0)
  })
})


mongooseConnection.on('error', (err) => {
  console.log(`mongoose error ${err}`)
})

mongooseConnection.on('open', () => {
  console.log('mongoose connection open')
})

mongooseConnection.on('connected', () => {
  console.log(`mongoose connected to database ${dbURI}`)
})

mongooseConnection.on('disconnected', () => {
  console.log('mongoose disconnected')
})

export default { mongooseConnection }

