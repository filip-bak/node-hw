const ErrorHandler = (err, req, res, next) => {
  const errStatus = err.statusCode || 500
  const errMsg = err.message || 'Something went wrong'

  console.error(`Error: ${errMsg}`)

  res.status(errStatus).json({
    message: errMsg,
  })
}

module.exports = ErrorHandler
