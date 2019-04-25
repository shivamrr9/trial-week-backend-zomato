import express from 'express'

import imageRouter from './imageRoute'

const router = express.Router()

router.use('/imageRouter', imageRouter)

router.get('/', (req, res) => res.send('Index'))

export default router
