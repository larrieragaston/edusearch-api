/* globals ObjectId */

exports.name = "create-careers";
exports.description = "Creates first careers";

exports.isReversible = true;
exports.isIgnored = false;

exports.up = (db, done) => {
	db.collection("careers").insertMany(
		[
			{
				_id: new ObjectId("000000000000000000000000"),
				university: new ObjectId("000000000000000000000000"),
				name: "Tecnicatura Superior en Informática Aplicada",
				logo: null,
				url: null,
			},
			{
				_id: new ObjectId("000000000000000000000001"),
				university: new ObjectId("000000000000000000000000"),
				name: "Tecnicatura Superior en Electrónica",
				logo: null,
				url: null,
			},
			{
				_id: new ObjectId("000000000000000000000002"),
				university: new ObjectId("000000000000000000000001"),
				name: "Ingeniería en Informática",
				logo: null,
				url: null,
			},
			{
				_id: new ObjectId("000000000000000000000003"),
				university: new ObjectId("000000000000000000000001"),
				name: "Ingeniería Electrónica",
				logo: null,
				url: null,
			},
		],
		done
	);
};

exports.down = (db, done) => {
	db.collection("careers").deleteMany(
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
		],
		done
	);
};
