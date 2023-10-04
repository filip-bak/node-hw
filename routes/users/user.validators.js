const Joi = require('joi')

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

module.exports = {
  userValidator,
  userSubscriptionValidator,
}
