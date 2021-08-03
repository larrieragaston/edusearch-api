const { Router } = require('express')
const authenticate = require('../../src/authentication')

const router = new Router()

router.get('/postulations/postulationsForUser', authenticate, findPostulationsForUser)
router.post('/postulations', authenticate, createPostulation)

async function findPostulationsForUser(req, res, next) {
  req.logger.info(`Finding postulations for user with id ${req.user._id} using auth token`)

  try {
    const postulations = await req
      .model('Postulation')
      .find({ user: req.user._id })

    req.logger.verbose('Sending postulations to client')
    res.json(postulations)
  } catch (err) {
    next(err)
  }
}

async function createPostulation(req, res, next) {
  req.logger.info('Creating user', req.body)
  try {
    const { contest } = req.body

    const postulation = await req
      .model('Postulation')
      .create({
        contest: contest,
        user: req.user._id,
        date: new Date()
      })

    req.logger.verbose('Sending Postulation to user')
    res.json(postulation)
  } catch (err) {
    next(err)
  }
}

module.exports = router
