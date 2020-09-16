import express from 'express'
import mongoose from 'mongoose'

import Dance, { Status } from 'models/dance.model'

const router = express.Router()

/**
 * @route Post /api/dance/
 * @desc: Create a new dance session
 * @desc: Auto-set the status to active as the session has started
 * @desc: Make sure only one dance session is active at a time
 */
router.post('/', async (req, res) => {
  // Use transaction to avoid race condition and ensure atomicity
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    // Check for currently active dance session
    const activeDanceSession = await Dance.findOne({ status: Status.Active })
    if (activeDanceSession) {
      throw new Error('There is an ungoing dance session')
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
    console.log(err)
    res.status(500).json({
      success: false,
      message: 'Unexpected error',
    })
  } finally {
    session.endSession()
  }
})

/**
 * @route Get /api/dance/active
 * @desc: Check if there's a ongoing dance session
 * @desc: if no, throw 404 for active session not found
 */
router.get('/active', async (req, res) => {
  try {
    const conditions = { status: Status.Active }
    const danceSession = await Dance.findOne(conditions)
    if (!danceSession) {
      throw new Error('Not Found')
    }
    res.json(danceSession)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: 'Unexpected error',
    })
  }
})

/**
 * @route Post /api/dance/:danceSessionId/end
 * @desc: End the dance session by dance session id
 * @desc: set the status to idle
 */
router.post('/:danceSessionId/end', async (req, res) => {
  try {
    const conditions = { _id: req.params.danceSessionId }
    const update = { status: Status.Idle }
    await Dance.findOneAndUpdate(conditions, update)
    res.json({ success: true })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: 'Unexpected error',
    })
  }
})

export default router
