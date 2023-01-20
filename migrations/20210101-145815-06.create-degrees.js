/* globals ObjectId */

exports.name = "create-degrees";
exports.description = "Creates first degrees";

exports.isReversible = true;
exports.isIgnored = false;

exports.up = (db, done) => {
	db.collection("degrees").insertMany(
		[
			{
				_id: new ObjectId("000000000000000000000000"),
				user: new ObjectId("000000000000000000000006"),
				type: "Degree",
				subType: "Secondary",
				title: "Bachiller",
				institution: "Escuela 6",
				startYear: 2000,
				endYear: 2006,
			},
			{
				_id: new ObjectId("000000000000000000000001"),
				user: new ObjectId("000000000000000000000006"),
				type: "Degree",
				subType: "Secondary",
				title: "Bachiller",
				institution: "Escuela 6",
				startYear: 2000,
				endYear: 2006,
			},
			{
				_id: new ObjectId("000000000000000000000002"),
				user: new ObjectId("000000000000000000000007"),
				type: "Degree",
				subType: "Secondary",
				title: "Bachiller",
				institution: "Escuela 7",
				startYear: 2000,
				endYear: 2007,
			},
			{
				_id: new ObjectId("000000000000000000000003"),
				user: new ObjectId("000000000000000000000008"),
				type: "Degree",
				subType: "Secondary",
				title: "Bachiller",
				institution: "Escuela 8",
				startYear: 2000,
				endYear: 2008,
			},
			{
				_id: new ObjectId("000000000000000000000004"),
				user: new ObjectId("000000000000000000000009"),
				type: "Degree",
				subType: "Secondary",
				title: "Bachiller",
				institution: "Escuela 9",
				startYear: 2000,
				endYear: 2009,
			},
		],
		done
	);
};

exports.down = (db, done) => {
	db.collection("degrees").deleteMany(
		[
			{
				_id: new ObjectId("000000000000000000000000"),
			},
			{
				_id: new ObjectId("000000000000000000000001"),
			},
			{
				_id: new ObjectId("000000000000000000000002"),
			},
			{
				_id: new ObjectId("000000000000000000000003"),
			},
			{
				_id: new ObjectId("000000000000000000000004"),
			},
		],
		done
	);
};
