const { Router } = require("express");
const authenticate = require("../../src/authentication");
const multer = require("multer");
const uuid = require("uuid");

const router = new Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get(
	"/universities/getUniversityByUser",
	authenticate,
	findUniversityByUser
);
router.put(
	"/universities/updateUniversityByUser",
	authenticate,
	updateUniversityByUser
);
router.get(
	"/universities/getSubjectsByUniversity/:id",
	authenticate,
	findSubjectsByUniversity
);
router.post(
	"/universities/logo",
	authenticate,
	upload.single("universityLogo"),
	uploadUniversityLogo
);

async function findUniversityByUser(req, res, next) {
	req.logger.info(`Finding university by user id ${req.user._id}`);

	try {
		const user = await req
			.model("User")
			.findOne({ _id: req.user._id })
			.populate("university");

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
		const user = await req.model("User").findOne({ _id: req.user._id });

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

async function findSubjectsByUniversity(req, res, next) {
	req.logger.info(`Finding subjects by university id ${req.params.id}`);

	try {
		const careers = await req
			.model("Career")
			.find({ university: req.params.id })
			.sort({ name: 1 });

		if (!careers) {
			req.logger.verbose("Subjects not found");
			return res.status(404).end();
		}

		const careerIds = careers.map((c) => c._id);

		const subjects = await req
			.model("Subject")
			.find({ career: { $in: careerIds } })
			.sort({ name: 1 });

		if (!subjects) {
			req.logger.verbose("Subjects not found");
			return res.status(404).end();
		}

		req.logger.verbose("Sending subjects to client");
		res.json({ careers, subjects });
	} catch (err) {
		next(err);
	}
}

async function uploadUniversityLogo(req, res, next) {
	req.logger.info("Uploading university logo");

	try {
		if (!req.file) {
			return res.status(404).end("File is required");
		}

		const { buffer, mimetype, size } = req.file;
		// eslint-disable-next-line no-unused-vars
		const [type, format] = mimetype.split("/");
		const name = uuid.v4();
		const s3Key = `edusearch/universities-logo/${name}.${format}`;

		await req.s3.upload({
			buffer,
			key: s3Key,
			contentType: mimetype,
			contentLength: size,
		});

		const university = await req.model("University").findById(req.user.university);
	
		if (!university) {
			req.logger.verbose("University not found");
			return res.status(404).end();
		}

		university.logoUrl = s3Key;
		await university.save();

		req.logger.verbose("Sending University back to client");
		return res.json(university);
	} catch (err) {
		return next(err);
	}
}

module.exports = router;
