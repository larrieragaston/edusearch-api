const winston = require('winston')
const winstonChildLogger = require('winston-child-logger')

function createLogger(config) {
  const logger = winstonChildLogger(new winston.Logger())

  logger.levelLength = 7
  logger.padLevels = true

  logger.filters.push((_, message, meta) => {
    if (!message && meta instanceof Error) {
      return meta.stack || meta.message
    }
    return message
  })

  if (config.console) {
    logger.add(winston.transports.Console, config.console)
  }

  return logger
}

module.exports = createLogger
