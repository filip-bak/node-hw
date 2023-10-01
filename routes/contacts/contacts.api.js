const { InvalidQueryParamsError } = require('../../shared/errors')
const { isBoolean } = require('./contacts.validators')

class ApiFeatures {
  constructor(query, queryReq) {
    this.query = query
    this.queryReq = queryReq
    this.error
  }

  filter() {
    const { page, limit, favorite, ...filteredQuery } = this.queryReq

    // delete
    // if (!pageTest) {
    //   this.error = new InvalidQueryParamsError()
    //   console.log('pageTest', pageTest)
    // }
    // if (!limitTest) {
    //   this.error = new InvalidQueryParamsError()
    //   console.log('limitTest', limitTest)
    // }

    // if (!favTest & favorite) {
    //   this.error = new InvalidQueryParamsError()
    //   console.log('favTest', favTest)
    // }

    if (Object.keys(filteredQuery).length > 0) {
      this.error = new InvalidQueryParamsError()
    }
    this.quOery = this.query.find({})

    return this
  }
  favorite() {
    if (this.queryReq.favorite) {
      const { favorite } = this.queryReq

      this.query = this.query.find({ favorite })
    }
    return this
  }
  paginate() {
    const { page = 1, limit = 15 } = this.queryReq
    const skip = (page - 1) * limit

    this.query = this.query.skip(skip).limit(limit)

    return this
  }
}
module.exports = ApiFeatures
