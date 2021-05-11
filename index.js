const config = require('config')
const createLogger = require('./logger')
const createEduSearch = require('./src/eduSearch')

const logger = createLogger(config.logger)
const eduSearch = createEduSearch(config, logger)

eduSearch.createEduSearch = createEduSearch

module.exports = eduSearch
