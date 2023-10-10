const errorHandler = require('../errorHandler')
const createMockObjects = require('../../shared/testUtils')

describe('errorHandler', () => {
  const { req, res, next } = createMockObjects({})

  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should handle MulterError LIMIT_UNEXPECTED_FILE', () => {
    const err = {
      name: 'MulterError',
      code: 'LIMIT_UNEXPECTED_FILE',
      message: 'Unexpected file',
    }

    errorHandler(err, req, res, next)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Unexpected file',
    })
    expect(next).not.toHaveBeenCalled()
  })

  it('should handle MulterError LIMIT_FILE_SIZE', () => {
    const err = {
      name: 'MulterError',
      code: 'LIMIT_FILE_SIZE',
      message: 'File size limit exceeded',
    }

    errorHandler(err, req, res, next)

    expect(res.status).toHaveBeenCalledWith(413)
    expect(res.json).toHaveBeenCalledWith({
      message: 'File size limit exceeded',
    })
    expect(next).not.toHaveBeenCalled()
  })

  it('should handle empty errors', () => {
    const err = new Error()

    errorHandler(err, req, res, next)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Something went wrong',
    })
    expect(next).not.toHaveBeenCalled()
  })

  it('should handle custom class errors', () => {
    class customError extends Error {
      constructor() {
        super('Some error message')
        this.statusCode = 314
      }
    }
    const err = new customError()

    errorHandler(err, req, res, next)

    expect(res.status).toHaveBeenCalledWith(314)
    expect(res.json).toHaveBeenCalledWith({
      message: err.message,
    })
    expect(next).not.toHaveBeenCalled()
  })
  it('should handle other errors', () => {
    const err = new Error('Some error message')

    errorHandler(err, req, res, next)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      message: err.message,
    })
    expect(next).not.toHaveBeenCalled()
  })
})
