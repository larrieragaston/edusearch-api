/* globals ObjectId */

exports.name = "create-universities";
exports.description = "Creates firsts universities";

exports.isReversible = true;
exports.isIgnored = false;

exports.up = (db, done) => {
	db.collection("universities").insertMany(
		[
			{
				_id: new ObjectId("000000000000000000000000"),
				name: "UTN-INSPT",
				email: "admin@inspt.utn.edu.ar",
				address: {
					country: "Argentina",
					province: "CABA",
					locality: "CABA",
					street: "Av. Triunvirato",
					number: 3174,
					floor: null,
					department: null,
					postalCode: 1427,
				},
				logo: null,
				url: "http://www.inspt.utn.edu.ar/",
			},
			{
				_id: new ObjectId("000000000000000000000001"),
				name: "UADE",
				email: "admin@uade.edu.ar",
				address: {
					country: "Argentina",
					province: "CABA",
					locality: "CABA",
					street: "Lima",
					number: 775,
					floor: null,
					department: null,
					postalCode: 1073,
				},
				logo: null,
				url: "https://www.uade.edu.ar/",
			},
		],
		done
	);
};

exports.down = (db, done) => {
	db.collection("universities").deleteMany(
		[
			{
				_id: new ObjectId("000000000000000000000000"),
			},
			{
				_id: new ObjectId("000000000000000000000001"),
			},
		],
		done
	);
};
