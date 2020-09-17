import express from 'express'

import User from 'models/user.model'

const router = express.Router()

/**
 * @route Get /api/users/
 * @desc: Get all users
 */
router.get('/', async (req, res, next) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    next(err)
  }
})

/**
 * @route Post /api/users/
 * @desc: Create new user
 */
router.post('/', async (req, res, next) => {
  try {
    const newUser = new User({
      name: req.body.name,
      beetleId: req.body.beetleId,
      MAC: req.body.MAC,
    })
    const user = await newUser.save()
    res.json(user)
  } catch (err) {
    next(err)
  }
})

export default router
