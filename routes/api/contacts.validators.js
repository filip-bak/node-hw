const Joi = require('joi')
const formatPhoneNumber = require('../../utils/formatPhoneNumber.js')

const contactSchema = Joi.object({
  name: Joi.string()
    .alphanum()
    .alter({
      post: (schema) => schema.required(),
      put: (schema) => schema.optional(),
    }),
  email: Joi.string()
    .email()
    .alter({
      post: (schema) => schema.required(),
      put: (schema) => schema.optional(),
    }),
  phone: Joi.string()
    .min(7)
    .max(10)
    .pattern(/^\d{7,10}$/)
    .custom(formatPhoneNumber)
    .alter({
      post: (schema) => schema.required(),
      put: (schema) => schema.optional(),
    })
    .messages({
      'string.pattern.base': 'Phone number must contain only digits',
    }),
}).alter({
  put: (schema) =>
    schema.or('name', 'email', 'phone').messages({
      'object.missing': 'missing fields',
    }),
  post: (schema) =>
    schema.messages({
      'any.required': 'missing required {#label} - field',
    }),
})

/**
 * Middleware to validate a contact based on the HTTP request method (e.g., 'post' or 'put').
 * @param {string} requestMethod - The HTTP request method to tailor the validation.
 * @returns {function} - Express middleware function.
 */
const validateContact = (requestMethod) => (req, res, next) => {
  if (requestMethod !== 'put' && requestMethod !== 'post') {
    throw new Error('Unsupported request validation')
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

module.exports = {
  validateContact,
}
