const http = require('http')
const express = require('express')
const prettyMs = require('pretty-ms')
const onFinished = require('on-finished')
const helmet = require('helmet')
const cors = require('cors')
const compression = require('compression')
const { promisify } = require('util')

const authorization = require('./authorization')
const components = require('../components')

const statusCodeByErrorName = {
  ValidationError: 400,
  CastError: 400,
  UnauthorizedError: 401
}

function createServer({ config, database, logger }) {
  const app = express()
  const server = {
    httpServer: http.createServer(app),
    logger: logger.child({ context: 'Server' }),
    app,
    config,
    database
  }

  server.listen = function listen() {
    server.logger.verbose(`Attempting to bind HTTP server to port ${config.server.port}`)

    return promisify(server.httpServer.listen)
      .call(server.httpServer, config.server.port)
      .then(function then() {
        server.logger.verbose('HTTP server bound')
      })
  }

  server.close = function close() {
    return promisify(server.httpServer.close).call(server.httpServer)
  }

  setupExpressMiddleware(server)
  setupExpressRoutes(server)
  setupErrorHandler(server)

  return server
}

function setupExpressMiddleware(server) {
  const { config, logger } = server

  /* eslint-disable no-param-reassign */
  server.app.request.config = config
  server.app.request.logger = logger
  server.app.request.model = (...args) => server.database.model(...args)
  server.app.request.pingDatabase = () => server.database.ping()
  /* eslint-enable no-param-reassign */

  function createRequestIdMiddleware() {
    return function requestId(req, res, next) {
      req.id = req.headers['x-request-id']
      next(null)
    }
  }

  function createRequestLoggerMidleware() {
    return function requestLogger(req, res, next) {
      // eslint-disable-next-line no-underscore-dangle
      req._startTime = Date.now()

      logger.verbose('Incoming request', {
        httpVersion: req.httpVersion,
        method: req.method,
        url: req.url,
        headers: req.headers,
        trailers: req.trailers
      })

      onFinished(res, function done() {
        logger.verbose('Outgoing response', {
          httpVersion: req.httpVersion,
          method: req.method,
          url: req.url,
          statusCode: res.statusCode,
          // eslint-disable-next-line no-underscore-dangle
          duration: prettyMs(Date.now() - req._startTime)
        })
      })

      next(null)
    }
  }

  const requestQuery = () => (req, res, next) => {
    req.select = req.query.select
    req.sort = req.query.sort
    req.populate = req.query.populate
    req.offset = req.query.offset ? parseInt(req.query.offset, 10) : 0
    req.limit = req.query.limit
      ? Math.min(parseInt(req.query.limit, 10), config.server.maxResultsLimit)
      : config.server.maxResultsLimit

    delete req.query.sort
    delete req.query.offset
    delete req.query.limit
    delete req.query.select
    delete req.query.populate

    next(null)
  }

  logger.verbose('Attaching middleware to express app')
  server.app.use(createRequestIdMiddleware())
  server.app.use(createRequestLoggerMidleware())
  server.app.use(authorization)
  server.app.use(helmet())
  server.app.use(express.raw())
  server.app.use(express.json({ limit: '5mb' }))
  server.app.use(express.urlencoded({ extended: true }))
  server.app.use(requestQuery())
  server.app.use(cors())
  server.app.use(compression())
  logger.verbose('Middleware attached')
}

function setupExpressRoutes(server) {
  server.logger.verbose('Attaching resource routers to express app...')
  server.app.use('/', components.root.route)
  server.app.use('/', components.status.route)
  server.app.use('/', components.user.route)
  server.app.use('/', components.contest.route)
  server.app.use('/', components.postulation.route)
  server.logger.verbose('Resource routers attached')
}

function setupErrorHandler(server) {
  server.logger.verbose('Attaching error handler...')
  // eslint-disable-next-line no-unused-vars
  server.app.use((err, req, res, next) => {
    if (!err.statusCode) {
      // eslint-disable-next-line no-param-reassign
      err.statusCode = statusCodeByErrorName[err.name] || 500
    }
    req.logger.error(err.toString(), err)
    req.logger.verbose('Responding to client', err.toString())
    res.status(err.statusCode).send(err.toString())
  })
  server.logger.verbose('Error handler attached')
}

module.exports = createServer
