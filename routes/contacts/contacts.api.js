const { getSkip } = require('./contacts.validators')

class ApiFeatures {
  constructor(query, queryReq) {
    this.query = query
    this.queryReq = queryReq
  }

  filter(objToFind) {
    try {
      this.query = this.query.find(objToFind)
    } catch (error) {
      console.log(error)
    }

    return this
  }

  populate(refKey, select) {
    this.query = this.query.populate(refKey, select)

    return this
  }

  favorite() {
    const { favorite } = this.queryReq

    if (favorite) {
      this.query = this.query.find({ favorite })
    }

    return this
  }

  paginate() {
    const { page, limit } = this.queryReq
    if (page || limit) {
      const defaultPage = page || 1
      const defaultLimit = limit || 15

      const skip = getSkip(defaultPage, defaultLimit)

      this.query = this.query.skip(skip).limit(defaultLimit)
    }
    return this
  }
}

module.exports = ApiFeatures
