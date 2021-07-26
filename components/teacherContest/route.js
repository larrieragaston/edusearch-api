const { Router } = require('express')
// const jwt = require('jsonwebtoken')
const authenticate = require('../../src/authentication')

const router = new Router()

router.get('/teacherContests/getContestById/:id', authenticate, findContestById)
router.get('/teacherContests/contestForUser', authenticate, findContestForUser)
// router.get('/users/contestPostulations', authenticate, findContestPostulations)
// router.get('/users/favouriteContest', authenticate, findFavouriteContest)

async function findContestForUser(req, res, next) {
    req.logger.info(`Finding contests for user with id ${req.user._id} using auth token`)

    try {
        const contests = await req
            .model('TeacherContest')
            .find()
            .populate('University')
            // .populate('Career')
            // .populate('Subject')

        req.logger.verbose('Sending contests to client')
        res.json(contests)
    } catch (err) {
        next(err)
    }
}

async function findContestById(req, res, next) {
    req.logger.info(`Finding contest with id ${req.params.id} using auth token`)
  
    try {
      const contest = await req
        .model('TeacherContest')
        .findOne({ _id: req.params.id })
        .lean()
        .exec()
        // .populate('University')
        // .populate('Career')
        // .populate('Subject')
  
      if (!contest) {
        req.logger.verbose('Contest not found. Sending 404 to client')
        return res.status(404).end()
      }
  
      req.logger.verbose('Sending Contest to client')
      return res.json(contest)
    } catch (err) {
      return next(err)
    }
  }

module.exports = router
