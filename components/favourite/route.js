const { Router } = require('express')
const authenticate = require('../../src/authentication')

const router = new Router()

router.get('/favourites/favouritesForUser', authenticate, findFavouritesForUser)
router.post('/favourites', authenticate, createFavouritesContests)
router.delete('/favourites/deleteByContestId/:id', authenticate, deleteFavouriteByContestId)

async function findFavouritesForUser(req, res, next) {
  req.logger.info(`Finding FavouriteContest for user with id ${req.user._id} using auth token`)

  try {
    const favourites = await req
      .model('Favourite')
      .find({ user: req.user._id })

    req.logger.verbose('Sending FavouriteContest to client')
    res.json(favourites)
  } catch (err) {
    next(err)
  }
}

async function createFavouritesContests(req, res, next) {
  req.logger.info('Creating FavouriteContest ', req.body)
  try {
    const { contest } = req.body

    const favourite = await req
      .model('Favourite')
      .create({
        contest: contest,
        user: req.user._id,
        date: new Date()
      })

    req.logger.verbose('Sending FavouriteContest to user')
    res.json(favourite)
  } catch (err) {
    next(err)
  }
}

async function deleteFavouriteByContestId(req, res, next) {
  req.logger.info(`Finding FavouriteContest with contestId ${req.params.id} using auth token`)

  try {
    const result = await req.model('Favourite').findOne({ contest: req.params.id, user: req.user._id })

    if (result.n < 1) {
      req.logger.verbose('FavouriteContest not found')
      return res.status(404).end()
    }
    
    await req.model('Favourite').remove({ contest: req.params.id, user: req.user._id })
    req.logger.verbose('Favourite removed')

    return res.status(204).end()
  } catch (err) {
    return next(err)
  }
}

module.exports = router
