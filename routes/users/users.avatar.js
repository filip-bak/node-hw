const jimp = require('jimp')
const path = require('path')
const { FileRequiredError } = require('../../shared/errors')

// --------- "BETTER" WAY --------- || buffer => resize => write ||
const getAvatarPublicURL = async (req) => {
  try {
    if (!req.file) throw new FileRequiredError()

    const { originalname, fieldname, buffer } = req.file
    const mimetype =
      originalname.slice(-4) === 'jpeg' ? '.jpg' : originalname.slice(-4)

    const fileName = `${fieldname}-${req.user._id}${mimetype}`

    const avatar = await jimp.read(buffer)
    await avatar
      .resize(250, 250)
      .writeAsync(path.join(__dirname, '../../public/avatars', fileName))

    return `${req.protocol}://${req.headers.host}/avatars/${fileName}`
  } catch (err) {
    console.error(err)
    throw err
  }
}

// --------- "LEARNING" WAY --------- || read => (buffer => read) => resize => write => rename ||
// const fs = require('fs/promises')
// const getAvatarPublicURL = async (req) => {
//   try {
//     if (req.file === undefined) throw new FileRequiredError()

//     const { originalname, fieldname, path: filePath } = req.file
//     const { _id } = req.user

//     const mimetype =
//       originalname.slice(-4) === 'jpeg' ? '.jpg' : originalname.slice(-4)

//     const fileName = `${fieldname}-${_id}${mimetype}`

//     const avatar = await jimp.read(filePath)
//     const resizeAvatar = avatar.resize(250, 250)
//     await resizeAvatar.writeAsync(filePath)
//     await fs.rename(
//       filePath,
//       path.join(__dirname, '../../public/avatars', fileName)
//     )

//     return `${req.protocol}://${req.headers.host}/avatars/${fileName}`
//   } catch (err) {
//     console.error(err)
//     throw err
//   }
// }

module.exports = { getAvatarPublicURL }
