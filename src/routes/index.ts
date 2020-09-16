import express from 'express'

const router = express.Router()

/**
 * @route GET /
 * @desc: GET home page
 */
router.get('/', (req, res, _) => {
  res.send('Hello!')
})

export default router
