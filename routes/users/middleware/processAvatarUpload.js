const multer = require('multer')
const { userAvatarValidator } = require('../user.validators')

// --- "LEARNING" WAY ---
// ↓ add:  dest: './tmp',
const upload = multer({
  fileFilter: userAvatarValidator,
  limits: {
    fileSize: 1048576,
  },
})

const processAvatarUpload = upload.single('avatar')

module.exports = processAvatarUpload
