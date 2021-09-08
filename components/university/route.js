const { Router } = require("express");
const authenticate = require("../../src/authentication");

const router = new Router();

router.get("/universities/getUniversityByUser", authenticate, findUniversityByUser);
router.put("/universities/updateUniversityByUser", authenticate, updateUniversityByUser);

async function findUniversityByUser(req, res, next) {
	req.logger.info(`Finding university by user id ${req.user._id}`);

	try {
		const user = await req
      .model('User')
      .findOne({ _id: req.user._id })
      .populate('university')

		if (!user?.university) {
			req.logger.verbose("University not found. Sending 404 to client");
			return res.status(404).end();
		}

		req.logger.verbose("Sending university to client");
		res.json(user.university);
	} catch (err) {
		next(err);
	}
}

async function updateUniversityByUser(req, res, next) {
	req.logger.info(`Updating university with id ${req.user._id}`);
	try {
    const user = await req
    .model('User')
    .findOne({ _id: req.user._id })

  if (!user?.university) {
    req.logger.verbose("University not found. Sending 404 to client");
    return res.status(404).end();
  }

		const results = await req
			.model("University")
			.update({ _id: user?.university }, req.body);

		if (results.n < 1) {
			req.logger.verbose("University not found");
			return res.status(404).end();
		}

		req.logger.verbose("University updated");
		res.status(204).end();
	} catch (err) {
		next(err);
	}
}

module.exports = router;
