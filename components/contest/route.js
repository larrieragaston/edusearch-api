const { Router } = require("express");
const authenticate = require("../../src/authentication");

const router = new Router();

router.get("/contests/getContestById/:id", authenticate, findContestById);
router.get("/contests/contestsForUser", authenticate, findContestsForUser);
router.get(
	"/contests/postulationsForUser",
	authenticate,
	findPostulationsForUser
);
router.get("/contests/favouriteForUser", authenticate, findFavouritesForUser);
router.get("/contests/closedForUser", authenticate, findClosedForUser);
router.post("/contests/createContest", authenticate, createContest);
router.put("/contests/editContest/:id", authenticate, editContest);
router.get(
	"/contests/draftContestsForUniversity",
	authenticate,
	findDraftContestsForUniversity
);
router.get(
	"/contests/activeContestsForUniversity",
	authenticate,
	findActiveContestsForUniversity
);
router.get(
	"/contests/endedContestsForUniversity",
	authenticate,
	findEndedContestsForUniversity
);
router.put("/contests/nextStage/:id", authenticate, nextStage);
router.put(
	"/contests/closeContest/:id",
	authenticate,
	calculateContestScoresById
);
router.get(
	"/contests/getPostulationsByContest/:id",
	authenticate,
	findPostulationsByContestId
);

async function calculateContestScoresById(req, res, next) {
	req.logger.info(`Finding contest with id ${req.params.id} using auth token`);

	try {
		req.logger.info(
			`Finding contest with id ${req.params.id} using auth token`
		);
		const contest = await req.model("Contest").findOne({ _id: req.params.id });

		if (!contest) {
			req.logger.verbose("Contest not found. Sending 404 to client");
			return res.status(404).end();
		}

		req.logger.info(
			`Finding UniversityScores with university id ${req.user.university} using auth token`
		);
		const universityScore = await req
			.model("Score")
			.findOne({ university: req.user.university });

		if (!universityScore) {
			req.logger.verbose("Contest not found. Sending 404 to client");
			return res.status(404).end();
		}

		req.logger.info(
			`Finding postulations with university id ${req.user.university} using auth token`
		);
		const postulations = await req
			.model("Postulation")
			.find({ contest: req.params.id })
			.populate("user");
		req.logger.info(
			`Where Found ${postulations.length} postulations for contest ${req.params.id}`
		);

		if (postulations.length == 0) {
			req.logger.verbose(
				"The selected Contest have no postulations to score. Sending 200 to client"
			);
			return res.status(200).end();
		}

		req.logger.info(`Finding all Degrees`);
		const degrees = await req.model("Degree").find();
		req.logger.info(`${degrees.length} degrees where found`);

		req.logger.info(`Loading degrees for postulated Users`);
		const postulationsWithDegrees = postulations.map((p) => {
			const userDegrees = degrees.filter((d) => {
				return d.user.equals(p.user._id);
			});
			return { postulation: p, degrees: userDegrees };
		});

		req.logger.info(`Calculating d escore for every postulation`);
		postulationsWithDegrees.forEach(async (pwd) => {
			req.logger.info(
				`Initializing teacherScore in 0 for postulation ${pwd._id}`
			);
			let teacherScore = 0;
			req.logger.info(`The user has ${pwd.degrees.length} degrees`);
			pwd.degrees.forEach((d) => {
				req.logger.info(`Evaluating ${d.type} degree for user`);
				switch (d.type) {
					case "Degree":
						switch (d.subType) {
							case "Secondary":
								teacherScore += universityScore.degreeSecondary ?? 0;
								break;
							case "NonUniversitary":
								teacherScore += universityScore.degreeNonUni ?? 0;
								break;
							case "NonUniversitary-PostTitle":
								teacherScore += universityScore.degreeNonUniPostTitle ?? 0;
								break;
							case "Grade":
								teacherScore += universityScore.degreeGrade ?? 0;
								break;
							case "Postgraduate-Specialization":
								teacherScore += universityScore.degreePostgraSpecial ?? 0;
								break;
							case "Postgraduate-Master":
								teacherScore += universityScore.degreePostgraMaster ?? 0;
								break;
							case "Postgraduate-Doctorate":
								teacherScore += universityScore.degreePostgraDoctorate ?? 0;
								break;
							default:
								break;
						}
						break;
					case "FurtherTraining":
						teacherScore += universityScore.furtherTraining ?? 0;
						break;
					case "Scholarship":
						teacherScore += universityScore.scholarship ?? 0;
						break;
					case "TeachingBackground":
						teacherScore += universityScore.teachingBackground ?? 0;
						break;
					case "ManagementBackground":
						teacherScore += universityScore.managementBackground ?? 0;
						break;
					case "ResearchBackground":
						teacherScore += universityScore.researchBackground ?? 0;
						break;
					case "HRBackground":
						teacherScore += universityScore.hRBackground ?? 0;
						break;
					case "EvaluationBackground":
						teacherScore += universityScore.evaluationBackground ?? 0;
						break;
					case "STBackground":
						teacherScore += universityScore.sTBackground ?? 0;
						break;
					case "AcademicProduction":
						teacherScore += universityScore.academicProduction ?? 0;
						break;
					case "Award":
						teacherScore += universityScore.award ?? 0;
						break;
					case "Other":
						teacherScore += universityScore.other ?? 0;
						break;
					default:
						break;
				}
				req.logger.info(`The teacherScore calculated is ${teacherScore}`);
			});

			req.logger.info(
				`Updating postulation ${pwd.postulation._id} with score ${teacherScore}`
			);
			const results = await req.model("Postulation").update(
				{ _id: pwd.postulation._id },
				{
					postulationScore: teacherScore,
				}
			);

			if (results.n < 1) {
				req.logger.verbose("Postulation not found");
				return res.status(404).end();
			}
		});

		req.logger.info(`Updating contest ${req.params.id} to the next stage`);
		const contest2 = await req
			.model("Contest")
			.findOneAndUpdate(
				{ _id: req.params.id },
				{ $inc: { activeStage: 1 } },
				{ new: true }
			);

		if (contest2.n < 1) {
			req.logger.verbose("Contest not found");
			return res.status(404).end();
		}

		req.logger.info(`Updating contest ${req.params.id} to isClosed = true`);
		const contest3 = await req
			.model("Contest")
			.findOneAndUpdate(
				{ _id: req.params.id },
				{ isClosed: true },
				{ new: true }
			);

		if (contest3.n < 1) {
			req.logger.verbose("Contest not found");
			return res.status(404).end();
		}

		req.logger.verbose("Contest Closed");

		req.logger.verbose("Sending contest to client");
		return res.json(contest3);
	} catch (err) {
		return next(err);
	}
}

async function findContestById(req, res, next) {
	req.logger.info(`Finding contest with id ${req.params.id} using auth token`);

	try {
		let contest = await req
			.model("Contest")
			.findOne({ _id: req.params.id })
			.populate("university")
			.populate("career")
			.populate("subject");

		if (!contest) {
			req.logger.verbose("Contest not found. Sending 404 to client");
			return res.status(404).end();
		}

		const postulation = await req
			.model("Postulation")
			.find({ contest: req.params.id, user: req.user._id });

		const favourite = await req
			.model("Favourite")
			.find({ contest: req.params.id, user: req.user._id });

		const contestWithPostulation = {
			...contest._doc,
			hasPostulation: postulation.length > 0,
			isFavourite: favourite.length > 0,
		};

		req.logger.verbose("Sending contestWithPostulation to client");
		return res.json(contestWithPostulation);
	} catch (err) {
		return next(err);
	}
}

async function findPostulationsByContestId(req, res, next) {
	req.logger.info(`Finding postulations for constest id ${req.params.id}`);

	try {
		const postulations = await req
			.model("Postulation")
			.find({ contest: req.params.id })
			.populate("user")
			.sort({ postulationScore: -1, date: 1 });

		if (!postulations) {
			req.logger.verbose("Postulations not found. Sending 404 to client");
			return res.status(404).end();
		}

		req.logger.verbose("Sending postulations to client");
		return res.json(postulations);
	} catch (err) {
		return next(err);
	}
}

async function findContestsForUser(req, res, next) {
	req.logger.info(
		`Finding all contests for user with id ${req.user._id} using auth token`
	);

	try {
		const contests = await req
			.model("Contest")
			.find({ $and: [{ isDraft: false }, { isClosed: false }] })
			.populate("university")
			.populate("career")
			.populate("subject");

		const postulations = await req
			.model("Postulation")
			.find({ user: req.user._id });

		const favourites = await req
			.model("Favourite")
			.find({ user: req.user._id });

		const contestsWithPostulations = contests.map(function (contest) {
			const hasPostulation = postulations.some((p) =>
				p.contest.equals(contest._id)
			);
			const isFavourite = favourites.some((p) => p.contest.equals(contest._id));
			return { ...contest._doc, hasPostulation, isFavourite };
		});

		req.logger.verbose("Sending all contestsWithPostulations to client");
		res.json(contestsWithPostulations);
	} catch (err) {
		next(err);
	}
}

async function findPostulationsForUser(req, res, next) {
	req.logger.info(
		`Finding postulation contests for user with id ${req.user._id} using auth token`
	);

	try {
		const contests = await req
			.model("Contest")
			.find({ $and: [{ isDraft: false }, { isClosed: false }] })
			.populate("university")
			.populate("career")
			.populate("subject");

		const postulations = await req
			.model("Postulation")
			.find({ user: req.user._id });

		const favourites = await req
			.model("Favourite")
			.find({ user: req.user._id });

		const contestsWithPostulations = contests
			.filter((x) => postulations.some((p) => p.contest.equals(x._id)))
			.map(function (contest) {
				const hasPostulation = postulations.some((p) =>
					p.contest.equals(contest._id)
				);
				const isFavourite = favourites.some((p) =>
					p.contest.equals(contest._id)
				);
				return { ...contest._doc, hasPostulation, isFavourite };
			});

		req.logger.verbose(
			"Sending postulations contestsWithPostulations to client"
		);
		res.json(contestsWithPostulations);
	} catch (err) {
		next(err);
	}
}

async function findFavouritesForUser(req, res, next) {
	req.logger.info(
		`Finding favourite contests for user with id ${req.user._id} using auth token`
	);

	try {
		const contests = await req
			.model("Contest")
			.find({ $and: [{ isDraft: false }, { isClosed: false }] })
			.populate("university")
			.populate("career")
			.populate("subject");

		const postulations = await req
			.model("Postulation")
			.find({ user: req.user._id });

		const favourites = await req
			.model("Favourite")
			.find({ user: req.user._id });

		const contestsWithPostulations = contests
			.filter((x) => favourites.some((p) => p.contest.equals(x._id)))
			.map(function (contest) {
				const hasPostulation = postulations.some((p) =>
					p.contest.equals(contest._id)
				);
				const isFavourite = favourites.some((p) =>
					p.contest.equals(contest._id)
				);
				return { ...contest._doc, hasPostulation, isFavourite };
			});

		req.logger.verbose("Sending favourite contestsWithPostulations to client");
		res.json(contestsWithPostulations);
	} catch (err) {
		next(err);
	}
}

async function findClosedForUser(req, res, next) {
	req.logger.info(
		`Finding closed contests for user with id ${req.user._id} using auth token`
	);

	try {
		const contests = await req
			.model("Contest")
			.find({ isClosed: true })
			.populate("university")
			.populate("career")
			.populate("subject");

		const postulations = await req
			.model("Postulation")
			.find({ user: req.user._id });

		const favourites = await req
			.model("Favourite")
			.find({ user: req.user._id });

		const contestsWithPostulations = contests
		.filter(contest => postulations.some((p) => p.contest.equals(contest._id)))
		.map(function (contest) {
			const hasPostulation = postulations.some((p) =>
				p.contest.equals(contest._id)
			);
			const isFavourite = favourites.some((p) => p.contest.equals(contest._id));
			return { ...contest._doc, hasPostulation, isFavourite };
		});

		req.logger.verbose("Sending all contestsWithPostulations to client");
		res.json(contestsWithPostulations);
	} catch (err) {
		next(err);
	}
}

async function createContest(req, res, next) {
	req.logger.info(`Creating contest for userid ${req.user._id}`);

	try {
		const user = await req.model("User").findOne({ _id: req.user._id });

		if (!user) {
			req.logger.verbose("User not found. Sending 404 to client");
			return res.status(404).end();
		}

		const contest = await req.model("Contest").create({
			...req.body,
			university: user.university,
			activeStage: 0,
		});

		if (!contest) {
			req.logger.verbose("Contest not created. Sending 404 to client");
			return res.status(404).end();
		}

		req.logger.verbose("Sending contest to client");
		return res.json(contest);
	} catch (err) {
		return next(err);
	}
}

async function editContest(req, res, next) {
	req.logger.info(`Updating contest with id ${req.params.id}`);

	try {
		const user = await req.model("User").findOne({ _id: req.user._id });

		if (!user) {
			req.logger.verbose("User not found. Sending 404 to client");
			return res.status(404).end();
		}

		const results = await req.model("Contest").update(
			{ _id: req.params.id },
			{
				...req.body,
				university: user.university,
				activeStage: 0,
			}
		);

		if (results.n < 1) {
			req.logger.verbose("Contest not found");
			return res.status(404).end();
		}

		req.logger.verbose("Contest updated");

		req.logger.verbose("Sending contest to client");
		return res.json(null);
	} catch (err) {
		return next(err);
	}
}

async function nextStage(req, res, next) {
	req.logger.info(`Updating contest with id ${req.params.id}`);

	try {
		const contest = await req
			.model("Contest")
			.findOneAndUpdate(
				{ _id: req.params.id },
				{ $inc: { activeStage: 1 } },
				{ new: true }
			);

		if (contest.n < 1) {
			req.logger.verbose("Contest not found");
			return res.status(404).end();
		}

		req.logger.verbose("Contest updated");

		req.logger.verbose("Sending contest to client");
		return res.json(contest);
	} catch (err) {
		return next(err);
	}
}

async function findDraftContestsForUniversity(req, res, next) {
	req.logger.info(
		`Finding draft contests for university with id ${req.user.university} using auth token`
	);

	try {
		const university = await req
			.model("University")
			.findById(req.user.university);

		if (!university) {
			req.logger.verbose("University not found");
			return res.status(404).end();
		}

		const contests = await req
			.model("Contest")
			.find({ isDraft: true })
			.populate("university")
			.populate("career")
			.populate("subject");

		if (!contests) {
			req.logger.verbose("Contests not found. Sending 404 to client");
			return res.status(404).end();
		}

		const filteredContests = contests.filter(
			(c) => c.university._id == req.user.university
		);

		req.logger.verbose("Sending all filteredContests to client");
		res.json(filteredContests);
	} catch (err) {
		next(err);
	}
}

async function findActiveContestsForUniversity(req, res, next) {
	req.logger.info(
		`Finding active contests for university with id ${req.user.university} using auth token`
	);

	try {
		const university = await req
			.model("University")
			.findById(req.user.university);

		if (!university) {
			req.logger.verbose("University not found");
			return res.status(404).end();
		}

		const contests = await req
			.model("Contest")
			.find({
				$and: [{ isDraft: false }, { isClosed: false }],
			})
			.populate("university")
			.populate("career")
			.populate("subject");

		if (!contests) {
			req.logger.verbose("Contests not found. Sending 404 to client");
			return res.status(404).end();
		}

		const filteredContests = contests.filter(
			(c) => c.university._id == req.user.university
		);

		req.logger.verbose("Sending all filteredContests to client");
		res.json(filteredContests);
	} catch (err) {
		next(err);
	}
}

async function findEndedContestsForUniversity(req, res, next) {
	req.logger.info(
		`Finding ended contests for university with id ${req.user.university} using auth token`
	);

	try {
		const university = await req
			.model("University")
			.findById(req.user.university);

		if (!university) {
			req.logger.verbose("Contests not found");
			return res.status(404).end();
		}

		const contests = await req
			.model("Contest")
			.find({
				isClosed: true,
			})
			.populate("university")
			.populate("career")
			.populate("subject");

		if (!contests) {
			req.logger.verbose("Contests not found. Sending 404 to client");
			return res.status(404).end();
		}

		const filteredContests = contests.filter(
			(c) => c.university._id == req.user.university
		);

		req.logger.verbose("Sending all filteredContests to client");
		res.json(filteredContests);
	} catch (err) {
		next(err);
	}
}

module.exports = router;
