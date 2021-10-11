const { Router } = require("express");
const authenticate = require("../../src/authentication");

const router = new Router();

router.get(
	"/subjects/getSubjectsByUniversity",
	authenticate,
	findSubjectsByUniversity
);

async function findSubjectsByUniversity(req, res, next) {
	req.logger.info(`Finding subjects by university user id ${req.user._id}`);
	
	try {
		const university = await req
			.model("University")
			.findById(req.user.university);
	
		if (!university) {
			req.logger.verbose("University not found");
			return res.status(404).end();
		}

		const subjects = await req
			.model("Subject")
			.find()
			.populate("career")
			.sort({ career: 1, name: 1 });

		if (!subjects) {
			req.logger.verbose("Subjects not found. Sending 404 to client");
			return res.status(404).end();
		}

		const filteredSubjects = subjects.filter(s => s.career.university == req.user.university)

		req.logger.verbose("Sending subjects to client");
		res.json(filteredSubjects);
	} catch (err) {
		next(err);
	}
}

module.exports = router;
