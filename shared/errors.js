// DATABASE
class DatabaseConectionError extends Error {
  constructor() {
    super('Database connection failed')
  }
}
class UnknownDatabaseError extends Error {
  constructor() {
    super('Oops, something went wrong at database layer.')
  }
}

// USER
class AuthenticationError extends Error {
  constructor() {
    super('Not authorized')
    this.statusCode = 401
  }
}
class UnauthorizedAccessError extends Error {
  constructor() {
    super('Unauthorized access.')
    this.statusCode = 403
  }
}
class DuplicatedKeyError extends Error {
  constructor() {
    super('Email address is already in use.')
    this.statusCode = 409
  }
}

// GENERAL
class NotFoundError extends Error {
  constructor() {
    super('Not found')
    this.statusCode = 404
  }
}
class PageNotFoundError extends Error {
  constructor() {
    super('This page is not Found!')
    this.statusCode = 404
  }
}
class ContactsNotFoundError extends Error {
  constructor() {
    super('Contacts not found.')
    this.statusCode = 404
  }
}
class InvalidQueryParamsError extends Error {
  constructor() {
    super('Invalid query parameters')
    this.statusCode = 400
  }
}

module.exports = {
  DatabaseConectionError,
  NotFoundError,
  PageNotFoundError,
  ContactsNotFoundError,
  InvalidQueryParamsError,
  UnknownDatabaseError,
  DuplicatedKeyError,
  AuthenticationError,
  UnauthorizedAccessError,
}
