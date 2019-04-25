import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import routes from './routes'
import config from './config/config.json'

/*eslint-disable */

global = {};
/* eslint-enable */

global.env = process.env.NODE_ENV || 'development'
global.config = config[global.env]

console.log(global.config)


const app = express()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: false }))

// logs the request
app.use((req, res, next) => {
  console.log(req.body)
  next()
})

app.use(cors())

// Controllers
app.use(routes)

// Host
const { port } = global.config.serverInfo

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})

export default app
