const { createUser, getUser, updateUser } = require('./users.dao')
const { generateAccessToken } = require('../auth/auth.service')
const { getAvatarPublicURL } = require('./users.avatar')
const { sendVerificationMail } = require('./user.mailer')

const signupHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const createdUser = await createUser({ email, password })

    await sendVerificationMail(email, createdUser.verificationToken)

    return res.status(201).json({
      user: {
        email: createdUser.email,
        subscription: createdUser.subscription,
      },
    })
  } catch (err) {
    return next(err)
  }
}
const loginHandaler = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await getUser({ email })
    const isPasswodValid = await user?.validatePassword(password)

    if (!user || !isPasswodValid) {
      return res.status(401).json({ message: 'Email or password is wrong' })
    }
    if (!user.verify) {
      return res.status(403).json({ message: 'User is not verified' })
    }

    const userPayload = {
      _id: user._id,
      email: user.email,
      subscription: user.subscription,
    }

    const token = generateAccessToken(userPayload)
    await updateUser(user.email, { token })

    return res.status(200).json({ token, user: userPayload })
  } catch (err) {
    return next(err)
  }
}
const logoutHandler = async (req, res, next) => {
  try {
    const { email } = req.user
    await updateUser(email, { token: null })

    return res.status(204).json()
  } catch (err) {
    return next(err)
  }
}

const currentHandler = async (req, res, next) => {
  try {
    const { _id } = req.user
    const user = await getUser({ _id })

    if (!user) {
      return res.status(401).json({ message: 'Not authorized' })
    }

    return res.send({ email: user.email, subscription: user.subscription })
  } catch (err) {
    return next(err)
  }
}

const subscriptionHandler = async (req, res, next) => {
  try {
    const { email } = req.user
    const { subscription } = req.body
    const user = await updateUser(email, { subscription })

    if (!user) {
      return res.status(401).json({ message: 'Not authorized' })
    }

    return res.send({ email: user.email, subscription: user.subscription })
  } catch (err) {
    return next(err)
  }
}

const avatarHandler = async (req, res, next) => {
  try {
    const { email } = req.user

    const avatarURL = await getAvatarPublicURL(req)

    await updateUser(email, { avatarURL })

    return res.json({ avatarURL })
  } catch (err) {
    console.error(err)
    return next(err)
  }
}
const verifyHandler = async (req, res, next) => {
  try {
    const { verificationToken } = req.params

    const user = await getUser({ verificationToken })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    if (user.verify) {
      return res.status(400).json({ message: 'User is already verified.' })
    }

    await updateUser(user.email, { verify: true, verificationToken: null })

    return res.status(200).json({ message: 'Verification successful' })
  } catch (err) {
    console.error(err)
    return next(err)
  }
}

const resendVerificationHandler = async (req, res, next) => {
  try {
    const { email } = req.body

    const user = await getUser({ email })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    if (user.verify) {
      return res.status(400).json({ message: 'User is already verified.' })
    }

    await sendVerificationMail(email, user.verificationToken)

    return res.status(200).json({ message: 'Verification email sent' })
  } catch (err) {
    console.error(err)
    return next(err)
  }
}

module.exports = {
  signupHandler,
  loginHandaler,
  logoutHandler,
  currentHandler,
  subscriptionHandler,
  avatarHandler,
  verifyHandler,
  resendVerificationHandler,
}
