const jwt = require('express-jwt')
const createError = require('http-errors')

function authentication(req, res, next) {
  if (!req.headers.authorization) {
    req.logger.verbose('Missing authorization header')
    return next(new createError.Unauthorized())
  }

  return jwt({ secret: req.config.auth.token.secret })(req, res, next)
}

module.exports = authentication
