const createMockObjects = (body = {}) => {
  const req = { body }
  const res = {}
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  const next = jest.fn()

  return { req, res, next }
}

module.exports = createMockObjects
