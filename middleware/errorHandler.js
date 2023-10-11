const ErrorHandler = (err, req, res, next) => {
  let errStatus = err.statusCode || 500
  const errMsg = err.message || 'Something went wrong'

  console.error({ Error: err })

  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      errStatus = 400
    }
    if (err.code === 'LIMIT_FILE_SIZE') {
      errStatus = 413
    }
  }

  return res.status(errStatus).json({
    message: errMsg,
  })
}

module.exports = ErrorHandler
