const { sendMail } = require('../mailer/mailer.service')

const sendVerificationMail = async (email, verificationToken) => {
  const mailOptions = {
    to: email,
    subject: 'Verify Your Account',
    text: `
    Dear User,

    Click the following link to verify your account:
    http://localhost:3000/api/users/verify/${verificationToken}

    Best regards,
    `,
    html: `
    <h4>Dear User,</h4>
    <p>
    Click the following link to verify your account: <br>
    <a href="http://localhost:3000/api/users/verify/${verificationToken}">verify account</a>
    </p>
    <p>Best regards,</p>
    `,
  }

  const emailStatus = await sendMail(mailOptions)

  if (emailStatus.success) {
    console.log(emailStatus.message)
  } else {
    console.error(emailStatus.message)
    throw new Error(emailStatus.message)
  }

  return emailStatus
}

module.exports = {
  sendVerificationMail,
}
