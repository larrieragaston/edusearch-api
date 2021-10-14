const { Router } = require('express')
const authenticate = require('../../src/authentication')

const router = new Router()

router.get('/postulations/postulationsForUser', authenticate, findPostulationsForUser)
router.post('/postulations', authenticate, createPostulation)
router.get('/postulations/postulationsForUniversity', authenticate, findPostulationsForUniversity)

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
  req.logger.info('Creating postulation', req.body)
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

async function findPostulationsForUniversity(req, res, next) {
  req.logger.info(`Finding postulations for university with id ${req.user.university} using auth token`)

  try {
    const university = await req
			.model("University")
			.findById(req.user.university);

		if (!university) {
			req.logger.verbose("University not found");
			return res.status(404).end();
		}

    const postulations = await req
			.model("Postulation")
			.find()
      .sort({date: 1})
			.populate("user")
      .populate('contest')


		if (!postulations) {
			req.logger.verbose("Postulations not found. Sending 404 to client");
			return res.status(404).end();
		}

    const subjects = await req
      .model("Subject")
      .find();

    const filteredPostulations = postulations
    .filter((x) => x.contest.university == req.user.university)
    .map(function (postulation) {
      const subject = subjects.find((s) =>
        s._id.equals(postulation.contest.subject)
      );
      return { ...postulation._doc, subject };
    });

		req.logger.verbose("Sending all filteredPostulations to client");
		res.json(filteredPostulations);
  } catch (err) {
    next(err)
  }
}

module.exports = router
