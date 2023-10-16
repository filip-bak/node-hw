const errors = require('../../shared/errors')
const gravatar = require('gravatar')
const User = require('./users.model')
const { nanoid } = require('nanoid')

const getUser = async (filter) => {
  try {
    return await User.findOne(filter)
  } catch (err) {
    console.error(err)

    throw new errors.UnknownDatabaseError()
  }
}

const createUser = async (userData) => {
  try {
    const { email } = userData
    const avatarURL = gravatar.url(email, { default: 'retro' }, true)
    const verificationToken = nanoid(30)

    return await User.create({
      ...userData,
      avatarURL,
      verify: false,
      verificationToken,
    })
  } catch (err) {
    console.error(err)

    if (err.code === 11000) {
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

module.exports = { getUser, createUser, updateUser }
