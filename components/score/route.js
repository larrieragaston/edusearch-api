const { Router } = require("express");
const authenticate = require("../../src/authentication");

const router = new Router();

router.get("/scores/getScores", authenticate, findScoresByUniversity);
router.post("/scores/create", authenticate, createScore);
router.put("/scores/updateById/:id", authenticate, updateScoreById);

async function findScoresByUniversity(req, res, next) {
	req.logger.info(
		`Finding Scores for Univerity id ${req.user.university} using auth token`
	);

	try {
		const scores = await req.model("Score").find({ _id: req.user.university });

		req.logger.verbose("Sending scores to client");
		return res.json(scores);
	} catch (err) {
		return next(err);
	}
}

async function createScore(req, res, next) {
	req.logger.info("Creating score", req.body);

	try {
		const score = await req
			.model("Score")
			.create({ ...req.body, university: req.user.university });

		req.logger.verbose("Sending Score to user");
		res.json(score);
	} catch (err) {
		next(err);
	}
}

async function updateScoreById(req, res, next) {
	req.logger.info(`Finding score with id ${req.params.id}`);

	try {
		const result = await req
			.model("Score")
			.update({ _id: req.params.id }, req.body);

		if (result.n < 1) {
			req.logger.verbose("Score not found");
			return res.status(404).end();
		}

		const score = await req.model("Score").findOne({ _id: req.params.id });

		req.logger.verbose("Score updated");

		return res.json(score);
	} catch (err) {
		return next(err);
	}
}

module.exports = router;
