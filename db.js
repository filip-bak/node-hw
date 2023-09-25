const mongoose = require('mongoose')
const { DatabaseConectionError } = require('./shared/errors')
const { URI } = require('./config')

const connect = async () => {
  try {
    await mongoose.connect(URI)
  } catch (err) {
    console.error(err)
    throw new DatabaseConectionError()
  }
}

module.exports = {
  connect,
}
