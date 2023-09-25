class DatabaseConectionError extends Error {
  constructor() {
    super('Database connection failed')
  }
}
class NotFoundError extends Error {
  constructor() {
    super('Not found')
    this.statusCode = 404
  }
}

module.exports = {
  DatabaseConectionError,
  NotFoundError,
}
