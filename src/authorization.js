function authorizationMiddleware(req, res, next) {
  req.hasPermission = function(permissionsTo) {
    return true
  }

  next(null)
}

module.exports = authorizationMiddleware
