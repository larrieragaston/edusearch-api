const { Router } = require('express')
const authenticate = require('../../src/authentication')

const router = new Router()

router.post('/degrees/create', authenticate, createDegree)
router.put('/degrees/updateById/:id', authenticate, updateDegreeById)
router.delete('/degrees/deleteById/:id', authenticate, deleteDegreeById)

async function createDegree(req, res, next) {
  req.logger.info('Creating degree', req.body)
  try {

    const degree = await req
      .model('Degree')
      .create({...req.body, user: req.user._id})

    req.logger.verbose('Sending Degree to user')
    res.json(degree)
  } catch (err) {
    next(err)
  }
}

async function updateDegreeById(req, res, next) {
  req.logger.info(`Finding degree with id ${req.params.id} using auth token`)

  try {
    const result = await req.model('Degree').update({ _id: req.params.id }, req.body)

    if (result.n < 1) {
      req.logger.verbose('Degree not found')
      return res.status(404).end()
    }

    const degree = await req.model('Degree').findOne({ _id: req.params.id })

    req.logger.verbose('Degree updated')

    return res.json(degree)
  } catch (err) {
    return next(err)
  }
}

async function deleteDegreeById(req, res, next) {
  req.logger.info(`Finding degree with id ${req.params.id} using auth token`)

  try {
    const result = await req.model('Degree').findOne({ _id: req.params.id })
    
    if (result.n < 1) {
      req.logger.verbose('Degree not found')
      return res.status(404).end()
    }
    
    await req.model('Degree').remove({ _id: req.params.id })
    req.logger.verbose('Degree removed')

    return res.status(204).end()
  } catch (err) {
    return next(err)
  }
}

module.exports = router
