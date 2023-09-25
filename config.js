const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  serverPort: process.env.PORT || 3000,
  URI: process.env.MONGO_URI,
}
