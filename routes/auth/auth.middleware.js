const { AuthenticationError } = require('../../shared/errors')
const { getUser } = require('../users/users.dao')
const { verifyToken } = require('./auth.service')

const extractBearerToken = (headers) => {
  return headers.authorization?.replace('Bearer ', '')
}

const authMiddleware = async (req, res, next) => {
  try {
    const token = extractBearerToken(req.headers)

    if (!token) {
      throw new AuthenticationError()
    }

    const decodedToken = verifyToken(token)
    const user = await getUser({ _id: decodedToken._id })

    if (!user || user.token !== token) {
      throw new AuthenticationError()
    }

    req.user = user
    return next()
  } catch (err) {
    return res.status(401).json({ message: err.message })
  }
}

module.exports = { authMiddleware }
