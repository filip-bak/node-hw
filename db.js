const mongoose = require('mongoose')
const { DatabaseConectionError } = require('./shared/errors')
const { URI, DEV_URI, ENV } = require('./config')

const connect = async () => {
  try {
    const databaseURI = ENV === 'development' ? DEV_URI : URI

    await mongoose.connect(databaseURI)
  } catch (err) {
    console.error(err)
    throw new DatabaseConectionError()
  }
}

module.exports = {
  connect,
}
