import express from 'express'

import usersRouter from 'routes/api/users'
import danceRouter from 'routes/api/dance'
import sensorRouter from 'routes/api/sensor'
import movementRouter from 'routes/api/movement'
import predictedMovementRouter from 'routes/api/predictedMovement'

const router = express.Router()

/**
 * @route * /api/users/*
 */
router.use('/users', usersRouter)

/**
 * @route * /api/dance/*
 */
router.use('/dance', danceRouter)

/**
 * @route * /api/sensor/*
 */
router.use('/sensor', sensorRouter)

/**
 * @route * /api/movement/*
 */
router.use('/movement', movementRouter)

/**
 * @route * /api/predicted-movement/*
 */
router.use('/predicted-movement', predictedMovementRouter)

export default router
