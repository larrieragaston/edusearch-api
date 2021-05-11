const { Router } = require('express')
const pkg = require('../../package.json')

const router = new Router()

router.get('/', getStatus)

function getStatus(req, res) {
  req.logger.verbose('Requesting root')

  const { name, version } = pkg

  res.json({
    name,
    version
  })
}

module.exports = router
