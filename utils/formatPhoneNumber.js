/**
 * Format Phone Number
 *
 * Description:
 * This function takes a phone number string as input and formats it according to specific rules.
 * The formatted phone number is returned as a string.
 *
 * Formatting Rules:
 * - 7 digits: "123 4567"
 * - 8 digits: "1234 5678"
 * - 9 digits: "123 456 789"
 * - 10 digits: "(123) 456-7890"
 *
 * @param {string} value - The input phone number string to be formatted.
 *
 * @returns {string} - The formatted phone number string.
 * @throws {Error} - Throws a validation error if the input is not a valid phone number.
 */
const formatPhoneNumber = (phoneNumber, helpers) => {
  const number = phoneNumber.replace(/\D/g, '')

  const obj = {
    7: () => number.replace(/(\d{3})(\d{4})/, '$1 $2'),
    8: () => number.replace(/(\d{4})(\d{4})/, '$1 $2'),
    9: () => number.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3'),
    10: () => number.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3'),
  }

  if (obj[number.length]) {
    return obj[number.length]()
  }

  return helpers.error('phone.invalidFormat')
}

module.exports = formatPhoneNumber
