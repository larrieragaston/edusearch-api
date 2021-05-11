const { Mongoose } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const mongooseTimestamp = require('mongoose-cu-timestamps')
const components = require('../components')

function createDatabase({ config, logger }) {
  const db = {
    logger: logger.child({ context: 'Database' }),
    config: config.get('mongo')
  }

  db.logger.verbose('Creating mongoose instance')
  db.mongoose = new Mongoose()
  db.logger.verbose('Mongoose instance created')

  db.connect = function connect() {
    db.logger.verbose('Connecting to database')
    return db.mongoose.connect(db.config.url).then(function() {
      db.logger.verbose('Connected to database')
    })
  }

  db.disconnect = function disconnect() {
    db.logger.verbose('Disconnecting from database...')
    return db.mongoose.disconnect().then(function() {
      db.logger.verbose('Disconnected from database')
    })
  }

  db.model = function model(...args) {
    return db.mongoose.model(...args)
  }

  db.ping = function ping() {
    if (!db.mongoose.connection.db) {
      return Promise.reject(new Error('Not connected to database'))
    }
    return db.mongoose.connection.db.admin().ping()
  }

  setupMongoosePlugins(db)
  setupMongooseModels(db)

  return db
}

function setupMongoosePlugins(db) {
  db.logger.verbose('Attaching plugins...')
  mongoosePaginate.paginate.options = { lean: true }
  db.mongoose.plugin(mongoosePaginate)
  db.mongoose.plugin(mongooseTimestamp)
  db.logger.verbose('Plugins attached')
}

function setupMongooseModels(db) {
  db.logger.verbose('Registering models')
  // db.mongoose.model('Account', components.account.schema)
  // db.mongoose.model('Role', components.role.schema)
  // db.mongoose.model('User', components.user.schema)
  // db.mongoose.model('Conversation', components.conversation.schema)
  db.logger.verbose('Models registered')
}

module.exports = createDatabase
