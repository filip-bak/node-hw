const errors = require('../../shared/errors')
const { ObjectId } = require('bson')
const gravatar = require('gravatar')
const User = require('./users.model')

const getUser = async (userEmail) => {
  try {
    return await User.findOne({ email: userEmail })
  } catch (err) {
    console.error(err)

    throw new errors.UnknownDatabaseError()
  }
}
const getUserById = async (userId) => {
  try {
    if (!ObjectId.isValid(userId)) {
      return null
    }

    return await User.findById(userId)
  } catch (err) {
    console.error(err)

    throw new errors.UnknownDatabaseError()
  }
}

const createUser = async (userData) => {
  try {
    const { email } = userData
    const avatarURL = gravatar.url(email, { default: 'retro' }, true)

    return await User.create({ ...userData, avatarURL })
  } catch (err) {
    console.error(err)

    if (err.code === 1100) {
      throw new errors.DuplicatedKeyError()
    }

    throw new errors.UnknownDatabaseError()
  }
}

const updateUser = async (userEmail, userData) => {
  try {
    return await User.findOneAndUpdate({ email: userEmail }, userData, {
      new: true,
    })
  } catch (err) {
    console.error(err)
    throw new errors.UnknownDatabaseError()
  }
}

module.exports = { getUser, getUserById, createUser, updateUser }
