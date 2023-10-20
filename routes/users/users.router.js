const express = require('express')
const userCtrl = require('./users.controllers')
const {
  userValidator,
  userSubscriptionValidator,
  userVerifyValidator,
} = require('./user.validators')
const { authMiddleware } = require('../auth/auth.middleware')
const processAvatarUpload = require('./middleware/processAvatarUpload')

const userRouter = express.Router()

userRouter.post('/signup', userValidator, userCtrl.signupHandler)

userRouter.post('/login', userValidator, userCtrl.loginHandaler)

userRouter.get('/logout', authMiddleware, userCtrl.logoutHandler)

userRouter.get('/current', authMiddleware, userCtrl.currentHandler)

userRouter.get('/verify/:verificationToken', userCtrl.verifyHandler)
userRouter.post(
  '/verify',
  userVerifyValidator,
  userCtrl.resendVerificationHandler
)

userRouter.patch(
  '/',
  authMiddleware,
  userSubscriptionValidator,
  userCtrl.subscriptionHandler
)

userRouter.patch(
  '/avatars',
  authMiddleware,
  processAvatarUpload,
  userCtrl.avatarHandler
)

module.exports = userRouter
