const Joi = require('joi')
const errors = require('../../shared/errors')

const userSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(3).required(),
})
const userSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
})

const userValidator = (req, res, next) => {
  const { error } = userSchema.validate(req.body)

  if (error) {
    return res.status(400).json({
      message: error.message,
    })
  }

  return next()
}

const userSubscriptionValidator = (req, res, next) => {
  const { error } = userSubscriptionSchema.validate(req.body)

  if (error) {
    return res.status(400).json({
      message: error.message,
    })
  }

  return next()
}

const userAvatarValidator = (req, file, cb) => {
  const allowedFileTypes = /.(jpeg|jpg|png)$/i

  const extname = allowedFileTypes.test(file.originalname.toLowerCase())
  const mimetype = allowedFileTypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    return cb(new errors.InvalidFileTypeError(), false)
  }
}

module.exports = {
  userValidator,
  userSubscriptionValidator,
  userAvatarValidator,
}
