const { Router } = require('express')

const router = new Router()

router.get('/status', getStatus)

function getStatus(req, res) {
  req.logger.verbose('Requesting status')

  return req
    .pingDatabase()
    .then(function() {
      req.logger.verbose(
        'Successful status check, responding 200 status code to the client'
      )
      res.status(200).end()
    })
    .catch(function() {
      req.logger.verbose('Status check failed, responding 500 status code to the client')
      res.status(500).end()
    })
}

module.exports = router
