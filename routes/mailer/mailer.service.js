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
    const emailInfo = await transporter.sendMail(options)

    if (emailInfo.accepted.length > 0) {
      return {
        success: true,
        message: 'Email sent successfully.',
        info: emailInfo,
      }
    }

    return { success: false, message: 'Email sending failed.' }
  } catch (err) {
    console.error(err)
    throw new Error('Failed to send verification email.')
  }
}

module.exports = {
  sendMail,
}
