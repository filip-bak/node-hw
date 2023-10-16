const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  ENV: process.env.NODE_ENV,
  serverPort: process.env.PORT || 3000,
  URI: process.env.MONGO_URI,
  DEV_URI: process.env.DEV_MONGO_URI,
  tokenSecret: process.env.TOKEN_SECRET,
  tokenLifeTime: process.env.TOKEN_LIFETIME,
  gmailUser: process.env.GMAIL_USER,
  gmailPassword: process.env.GMAIL_PASSWORD,
}
