const { Router } = require('express')
// const jwt = require('jsonwebtoken')
const authenticate = require('../../src/authentication')

const router = new Router()

router.get('/contests/getContestById/:id', authenticate, findContestById)
router.get('/contests/contestForUser', authenticate, findContestForUser)
// router.get('/users/contestPostulations', authenticate, findContestPostulations)
// router.get('/users/favouriteContest', authenticate, findFavouriteContest)

async function findContestForUser(req, res, next) {
  req.logger.info(`Finding contests for user with id ${req.user._id} using auth token`)

  try {
    const contests = await req
      .model('Contest')
      .find({})
      .populate('university')
      .populate('career')
      .populate('subject')

    const postulations = await req
      .model('Postulation')
      .find({ user: req.user._id })

    const contestsWithPostulations = contests.map(function (contest) {
      const hasPostulation = postulations.some(p => p.contest.equals(contest._id))
      return { ...contest._doc, hasPostulation }
    })

    req.logger.verbose('Sending contestsWithPostulations to client')
    res.json(contestsWithPostulations)
  } catch (err) {
    next(err)
  }
}

async function findContestById(req, res, next) {
  req.logger.info(`Finding contest with id ${req.params.id} using auth token`)

  try {
    let contest = await req
      .model('Contest')
      .findOne({ _id: req.params.id })
      .populate('university')
      .populate('career')
      .populate('subject')

    if (!contest) {
      req.logger.verbose('Contest not found. Sending 404 to client')
      return res.status(404).end()
    }

    const postulation = await req
      .model('Postulation')
      .find({ contest: contest._id, user: req.user._id })

    const contestWithPostulation = { ...contest._doc, hasPostulation: postulation.length > 0 }

    req.logger.verbose('Sending contestWithPostulation to client')
    return res.json(contestWithPostulation)
  } catch (err) {
    return next(err)
  }
}

module.exports = router
