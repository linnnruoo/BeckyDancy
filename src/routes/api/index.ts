import express from 'express'

import usersRouter from 'routes/api/users'

const router = express.Router()

/**
 * @route * /api/users/*
 */
router.use('/users', usersRouter)

export default router
