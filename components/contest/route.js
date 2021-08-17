const { Router } = require('express')
const authenticate = require('../../src/authentication')

const router = new Router()

router.get('/contests/getContestById/:id', authenticate, findContestById)
router.get('/contests/contestsForUser', authenticate, findContestsForUser)
router.get('/contests/postulationsForUser', authenticate, findPostulationsForUser)
router.get('/contests/favouriteForUser', authenticate, findFavouritesForUser)

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
    .find({ contest: req.params.id, user: req.user._id })
    
    const favourite = await req
    .model('Favourite')
    .find({ contest: req.params.id, user: req.user._id })
    
    const contestWithPostulation = { ...contest._doc, hasPostulation: postulation.length > 0, isFavourite: favourite.length > 0 }
    
    req.logger.verbose('Sending contestWithPostulation to client')
    return res.json(contestWithPostulation)
  } catch (err) {
    return next(err)
  }
}

async function findContestsForUser(req, res, next) {
  req.logger.info(`Finding all contests for user with id ${req.user._id} using auth token`)

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
      
    const favourites = await req
      .model('Favourite')
      .find({ user: req.user._id })

    const contestsWithPostulations = contests.map(function (contest) {
      const hasPostulation = postulations.some(p => p.contest.equals(contest._id))
      const isFavourite = favourites.some(p => p.contest.equals(contest._id))
      return { ...contest._doc, hasPostulation, isFavourite }
    })

    req.logger.verbose('Sending all contestsWithPostulations to client')
    res.json(contestsWithPostulations)
  } catch (err) {
    next(err)
  }
}

async function findPostulationsForUser(req, res, next) {
  req.logger.info(`Finding postulation contests for user with id ${req.user._id} using auth token`)

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
      
    const favourites = await req
      .model('Favourite')
      .find({ user: req.user._id })

    const contestsWithPostulations = contests
      .filter(x => postulations.some(p => p.contest.equals(x._id)))
      .map(function (contest) {
        const hasPostulation = postulations.some(p => p.contest.equals(contest._id))
        const isFavourite = favourites.some(p => p.contest.equals(contest._id))
        return { ...contest._doc, hasPostulation, isFavourite }
      })

    req.logger.verbose('Sending postulations contestsWithPostulations to client')
    res.json(contestsWithPostulations)
  } catch (err) {
    next(err)
  }
}

async function findFavouritesForUser(req, res, next) {
  req.logger.info(`Finding favourite contests for user with id ${req.user._id} using auth token`)

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
      
    const favourites = await req
      .model('Favourite')
      .find({ user: req.user._id })

    const contestsWithPostulations = contests
      .filter(x => favourites.some(p => p.contest.equals(x._id)))
      .map(function (contest) {
        const hasPostulation = postulations.some(p => p.contest.equals(contest._id))
        const isFavourite = favourites.some(p => p.contest.equals(contest._id))
        return { ...contest._doc, hasPostulation, isFavourite }
      })

    req.logger.verbose('Sending favourite contestsWithPostulations to client')
    res.json(contestsWithPostulations)
  } catch (err) {
    next(err)
  }
}

module.exports = router
