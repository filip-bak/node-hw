const express = require('express')
const userCtrl = require('./users.controllers')
const {
  userValidator,
  userSubscriptionValidator,
} = require('./user.validators')
const { authMiddleware } = require('../auth/auth.middleware')
const userRouter = express.Router()

userRouter.post('/signup', userValidator, userCtrl.signupHandler)

userRouter.post('/login', userValidator, userCtrl.loginHandaler)

userRouter.get('/logout', authMiddleware, userCtrl.logoutHandler)

userRouter.get('/current', authMiddleware, userCtrl.currentHandler)

userRouter.patch(
  '/',
  authMiddleware,
  userSubscriptionValidator,
  userCtrl.subscriptionHandler
)

module.exports = userRouter
