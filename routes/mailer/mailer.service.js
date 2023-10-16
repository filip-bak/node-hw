const nodemailer = require('nodemailer')
const { gmailUser, gmailPassword } = require('../../config')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailUser,
    pass: gmailPassword,
  },
})

const sendMail = async (options) => {
  try {
    await transporter.sendMail(options)
    return
  } catch (err) {
    console.error(err)
    throw new Error('Failed to send verification email.')
  }
}

module.exports = {
  sendMail,
}
