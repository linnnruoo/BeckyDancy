import express from 'express'

import Movement from 'models/movement.model'

const router = express.Router()

/**
 * @route Post /api/predicted-movement/
 * @desc: TEST -> Create new movement
 * @note: this route is not meant to exist
 * @todo: delete this route
 */
router.post('/', async (req, res, next) => {
  try {
    const newMovement = new Movement({
      move: req.body.move,
      position: req.body.position,
      correctPosition: req.body.correctPosition,
      syncDelay: req.body.syncDelay,
      date: new Date(),
    })
    const movement = await newMovement.save()
    res.json(movement)
  } catch (err) {
    next(err)
  }
})

export default router
