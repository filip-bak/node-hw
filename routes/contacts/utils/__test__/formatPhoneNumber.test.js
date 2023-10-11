const formatPhoneNumber = require('../formatPhoneNumber.js')

describe('formatPhoneNumber', () => {
  it('should format 7-digit phone number correctly', () => {
    const phoneNumber = '1234567'

    const formattedNumber = formatPhoneNumber(phoneNumber)

    expect(formattedNumber).toBe('123 4567')
  })

  it('should format 8-digit phone number correctly', () => {
    const phoneNumber = '12345678'

    const formattedNumber = formatPhoneNumber(phoneNumber)

    expect(formattedNumber).toBe('1234 5678')
  })

  it('should format 9-digit phone number correctly', () => {
    const phoneNumber = '123456789'

    const formattedNumber = formatPhoneNumber(phoneNumber)

    expect(formattedNumber).toBe('123 456 789')
  })

  it('should format 10-digit phone number correctly', () => {
    const phoneNumber = '1234567890'

    const formattedNumber = formatPhoneNumber(phoneNumber)

    expect(formattedNumber).toBe('(123) 456-7890')
  })

  it('should throw an error for invalid phone number format', () => {
    const invalidPhoneNumber = '123'
    const helpers = {
      error: (errorTag) => {
        if (errorTag === 'any.invalid')
          return '"phone" contains an invalid value'
      },
    }

    const formattedNumber = formatPhoneNumber(invalidPhoneNumber, helpers)

    expect(formattedNumber).toEqual('"phone" contains an invalid value')
  })
})
