const requireAll = require('require-all')
const toCamelCase = require('to-camel-case')

module.exports = requireAll({
  dirname: __dirname,
  recursive: true,
  map: name => toCamelCase(name)
})