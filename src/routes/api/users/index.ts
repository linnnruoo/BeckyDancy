import express from 'express'

import User from 'models/user.model'

const router = express.Router()

/**
 * @route Get /api/users/
 * @desc: Get all users
 */
router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Unexpected error',
    })
  }
})

/**
 * @route Post /api/users/
 * @desc: Create new user
 */
router.post('/', async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      beetleId: req.body.beetleId,
      MAC: req.body.MAC,
    })
    const user = await newUser.save()
    res.json(user)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: 'Unexpected error',
    })
  }
})

export default router
