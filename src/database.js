const { Mongoose } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const mongooseTimestamp = require('mongoose-cu-timestamps')
const components = require('../components')

function createDatabase({ config, logger }) {
  const db = {
    logger: logger.child({ context: 'Database' }),
    config: config.get('mongo'),
    options: { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  }

  db.logger.verbose('Creating mongoose instance')
  db.mongoose = new Mongoose()
  db.logger.verbose('Mongoose instance created')

  db.connect = function connect() {
    db.logger.verbose('Connecting to database')
    return db.mongoose.connect(db.config.url, db.options).then(function() {
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
  db.logger.verbose('Registering models...')
  db.mongoose.model('University', components.university.schema)
  db.mongoose.model('Career', components.career.schema)
  db.mongoose.model('Subject', components.subject.schema)
  db.mongoose.model('Contest', components.contest.schema)
  db.mongoose.model('User', components.user.schema)
  db.mongoose.model('Postulation', components.postulation.schema)
  db.mongoose.model('Degree', components.degree.schema)
  db.mongoose.model('Favourite', components.favourite.schema)
  db.mongoose.model('Score', components.score.schema)
  db.logger.verbose('Models registered')
}

module.exports = createDatabase
