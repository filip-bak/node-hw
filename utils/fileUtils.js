const fs = require('fs/promises')

const getParsedData = async (path) => {
  try {
    const data = await fs.readFile(path, 'utf8')
    return JSON.parse(data)
  } catch (err) {
    console.error(err)
  }
}
const writeFile = async (path, updatedData) => {
  try {
    const parsedData = JSON.stringify(updatedData, null, 2)
    return await fs.writeFile(path, parsedData)
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  getParsedData,
  writeFile,
}
