import express from 'express'

import usersRouter from 'routes/api/users'
import danceRouter from 'routes/api/dance'

const router = express.Router()

/**
 * @route * /api/users/*
 */
router.use('/users', usersRouter)

/**
 * @route * /api/dance/*
 */
router.use('/dance', danceRouter)

export default router
