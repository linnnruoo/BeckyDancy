import express from 'express'
import mongoose from 'mongoose'

import Dance, { Status } from 'models/dance.model'
import { NotFoundError, ConflictError } from 'utilities/httpError'

const router = express.Router()

/**
 * @route Post /api/dance/
 * @desc: Create a new dance session
 * @desc: Auto-set the status to active as the session has started
 * @desc: Make sure only one dance session is active at a time
 */
router.post('/', async (req, res, next) => {
  // Use transaction to avoid race condition and ensure atomicity
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    // Check for currently active dance session
    const activeDanceSession = await Dance.findOne({ status: Status.Active })
    if (activeDanceSession) {
      throw new ConflictError('There is an ongoing dance session!')
    }
    // Create new dance session,
    const danceSession = new Dance({
      dancers: req.body.dancers,
      status: Status.Active,
      date: new Date(),
    })
    const newDanceSession = await danceSession.save()
    await session.commitTransaction()

    res.json(newDanceSession)
  } catch (err) {
    session.abortTransaction()
    next(err)
  } finally {
    session.endSession()
  }
})

/**
 * @route Get /api/dance/active
 * @desc: Check if there's a ongoing dance session
 * @desc: if no, throw 404 for active session not found
 */
router.get('/active', async (req, res, next) => {
  try {
    const conditions = { status: Status.Active }
    const danceSession = await Dance.findOne(conditions)
    if (!danceSession) {
      throw new NotFoundError('No active dance session')
    }
    res.json(danceSession)
  } catch (err) {
    next(err)
  }
})

/**
 * @route Post /api/dance/:danceSessionId/end
 * @desc: End the dance session by dance session id
 * @desc: set the status to idle
 */
router.post('/end', async (req, res, next) => {
  try {
    const conditions = { status: Status.Active }
    const update = { status: Status.Idle }
    const danceSession = await Dance.findOne(conditions)
    if (!danceSession) {
      // design consideration:
      // just return success instead of throwing not found error
      res.json({ success: true })
      return
    }
    await Dance.findOneAndUpdate(conditions, update)
    res.json({ success: true })
  } catch (err) {
    next(err)
  }
})

export default router
