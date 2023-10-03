const {
  createUser,
  getUser,
  updateUser,
  getUserById,
} = require('./users.service')
const { generateAccessToken } = require('../auth/auth.service')

const signupHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const createdUser = await createUser({ email, password })

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
    const user = await getUser(email)
    const isPasswodValid = await user.validatePassword(password)

    if (!user || !isPasswodValid) {
      return res.status(401).json({ message: 'Email or password is wrong' })
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
    const user = await getUserById(_id)

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

module.exports = {
  signupHandler,
  loginHandaler,
  logoutHandler,
  currentHandler,
  subscriptionHandler,
}
