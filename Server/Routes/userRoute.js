const express = require("express");
const userRouter = express.Router();
const bcrypt = require('bcrypt')
const { User } = require('../Models/User')
const jwt = require('jsonwebtoken')
const JWT_USER_PASSWORD = "random123"

userRouter.post('/signup', async function (req, res) {
  const { userName, password, profileImage, location, graduationYear, job } =
    req.body

  try {
    const hashedPassword = await bcrypt.hash(password, 5)

    await User.create({
      userName,
      password: hashedPassword,
      profileImage,
      location,
      graduationYear,
      job
    })
  } catch (error) {
    console.log(error)
    res.json({
      message: 'Error in Signup'
    })
  }

  res.json({
    message: 'Signup succeded'
  })
})

userRouter.post('/signin', async function (req, res) {
  const { userName, password } = req.body

  const user = await User.findOne({
    userName
  })

  if (!user) {
    res.status(403).json({
      message: 'User does not exist in our db'
    })
  }

  const passwordMatch = await bcrypt.compare(password, user.password)

  if (passwordMatch) {
    const token = jwt.sign(
      {
        id: user._id.toString()
      },
      JWT_USER_PASSWORD
    )

    res.json({
      token: token,
      message: 'You are signed in',
      userName: user.userName
    })
  } else {
    res.status(403).json({
      message: 'Incorrect credentials'
    })
  }
})

module.exports = userRouter;

