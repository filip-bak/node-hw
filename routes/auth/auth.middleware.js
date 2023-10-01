const { NotAuthorizedError } = require('../../shared/errors')
const { getUserById } = require('../users/users.service')
const { verifyToken } = require('./auth.service')

const extractBearerToken = (headers) => {
  return headers.authorization?.replace('Bearer ', '')
}

const authMiddleware = async (req, res, next) => {
  try {
    const token = extractBearerToken(req.headers)

    if (!token) {
      throw new NotAuthorizedError()
    }

    const decodedToken = verifyToken(token)
    const user = await getUserById(decodedToken._id)

    if (!user || user.token !== token) {
      throw new NotAuthorizedError()
    }

    req.user = user
    return next()
  } catch (err) {
    return res.status(401).json({ message: err.message })
  }
}

module.exports = { authMiddleware }
