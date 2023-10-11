const JWT = require('jsonwebtoken')
const { tokenSecret, tokenLifeTime } = require('../../config')
const { AuthenticationError } = require('../../shared/errors')

const generateAccessToken = (userPayload) => {
  return JWT.sign(userPayload, tokenSecret, {
    expiresIn: tokenLifeTime ?? '1h',
  })
}

const verifyToken = (token) => {
  try {
    return JWT.verify(token, tokenSecret)
  } catch (err) {
    console.error(err)

    if (err instanceof JWT.TokenExpiredError) {
      throw new Error('Token expired.')
    }
    if (err instanceof JWT.JsonWebTokenError) {
      throw new Error('Token is invalid.')
    }

    throw new AuthenticationError()
  }
}

module.exports = {
  generateAccessToken,
  verifyToken,
}
