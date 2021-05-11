const createServer = require('./server')
const createDatabase = require('./database')
// const createTelegramClient = require('./telegram')

function createEduSearch(config, logger) {
  const database = createDatabase({ config, logger })
  const server = createServer({ config, database, logger })
  // const telegram = createTelegramClient({ config, database, logger })

  const eduSearch = {
    logger: logger.child({ context: 'EduSearch-API' }),
    config,
    database,
    server,
    // telegram,
    isRunning: false
  }

  eduSearch.start = function() {
    if (eduSearch.isRunning) {
      throw new Error('Cannot start EduSearch-API because it is already running')
    }
    eduSearch.isRunning = true

    logger.verbose('Starting EduSearch-API...')
    return Promise.all([
      eduSearch.database.connect(),
      eduSearch.server.listen(),
      // telegram.attach()
    ]).then(function() {
      logger.verbose('EduSearch-API is ready and awaiting requests!')

      return eduSearch.config.server
    })
  }

  eduSearch.stop = function() {
    if (!this.isRunning) {
      throw new Error('Cannot stop EduSearch-API because it is already stopped')
    }
    this.isRunning = false

    this.logger.verbose('Stopping EduSearch-API...')
    return Promise.all([this.database.disconnect(), this.server.close()]).then(
      function() {
        logger.verbose('EduSearch-API has closed all connections and successfully halted')
      }
    )
  }

  return eduSearch
}

module.exports = createEduSearch
