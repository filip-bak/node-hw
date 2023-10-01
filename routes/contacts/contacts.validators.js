const Joi = require('joi')
const formatPhoneNumber = require('../../utils/formatPhoneNumber.js')
const { Error } = require('mongoose')

const httpValidation = {
  post: (schema) => schema.required(),
  put: (schema) => schema.optional(),
}

const contactSchema = Joi.object({
  name: Joi.string().alphanum().alter(httpValidation),
  email: Joi.string().email().alter(httpValidation),
  phone: Joi.string()
    .min(7)
    .max(10)
    .pattern(/^\d{7,10}$/)
    .custom(formatPhoneNumber)
    .alter(httpValidation)
    .messages({
      'string.pattern.base': 'Phone number must contain only digits',
    }),
  favorite: Joi.boolean()
    .alter({ put: (schema) => schema.forbidden() })
    .optional(),
}).alter({
  put: (schema) =>
    schema.or('name', 'email', 'phone').messages({
      'object.missing': 'missing fields',
      'any.unknown':
        'Updating the "favorite" field is not allowed in this request.',
    }),
  post: (schema) =>
    schema.messages({
      'any.required': 'missing required {#label} - field',
    }),
})

const contactStatusSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    'any.required': 'missing field favorite',
  }),
})

const querySchema = Joi.object({
  favorite: Joi.boolean().optional(),
  limit: Joi.number().min(1).optional(),
  page: Joi.number().min(1).optional(),
})

const validateContact = (requestMethod) => (req, res, next) => {
  if (requestMethod !== 'put' && requestMethod !== 'post') {
    return next(new Error('Unsupported request validation'))
  }

  const contact = req.body
  const { value, error } = contactSchema.tailor(requestMethod).validate(contact)

  if (error) {
    return res.status(400).send({ message: error.message })
  }

  if (value.phone) {
    contact.phone = value.phone
  }

  return next()
}

const validateContactStatus = (req, res, next) => {
  const { error } = contactStatusSchema.validate(req.body)

  if (error) {
    return res.status(400).send({ message: error.message })
  }

  return next()
}

const validateQuery = (req, res, next) => {
  const reqQuery = {
    favorite: req.query.favorite || false,
    limit: req.query.limit || 15,
    page: req.query.page || 1,
  }
  const { error } = querySchema.validate(reqQuery)

  if (error) {
    return res.status(400).send({ message: error.message })
  }

  return next()
}

const isBoolean = (string) => {
  return { true: true, false: true }[string] || false
}

module.exports = {
  validateContact,
  validateContactStatus,
  isBoolean,
  validateQuery,
}
