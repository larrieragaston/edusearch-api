/* globals ObjectId */

exports.name = "create-users";
exports.description = "Creates first users";

exports.isReversible = true;
exports.isIgnored = false;

exports.up = (db, done) => {
	db.collection("users").insertMany(
		[
			{
				_id: new ObjectId("000000000000000000000000"),
				firstName: "Admin",
				lastName: "UADE",
				email: "admin_uade@edusearch.com",
				password:
					"$2a$10$J3Qa3YiZTxXBX7NsSXMWmeVfrnsK7GXyCQM8sQ0VpSgvULxA/DOgO", //Password1
				role: "UAdmin",
				university: new ObjectId("000000000000000000000001"),
				mediaUrl: null,
				idNumber: 10000000,
				birthDate: new Date("1990-05-29"),
				birthPlace: "Argentina",
				phone: "4444-4444",
				mobilePhone: "15-5555-5555",
				address: {
					country: "Argentina",
					province: "CABA",
					locality: "CABA",
					street: "Concordia",
					number: 2222,
					floor: null,
					department: null,
					postalCode: 1414,
				},
			},
			{
				_id: new ObjectId("000000000000000000000001"),
				firstName: "CouncilMember",
				lastName: "UADE",
				email: "cm_uade@edusearch.com",
				password:
					"$2a$10$J3Qa3YiZTxXBX7NsSXMWmeVfrnsK7GXyCQM8sQ0VpSgvULxA/DOgO", //Password1
				role: "UCouncilMember",
				university: new ObjectId("000000000000000000000001"),
				mediaUrl: null,
				idNumber: 10000001,
				birthDate: new Date("1990-05-29"),
				birthPlace: "Argentina",
				phone: "4444-4444",
				mobilePhone: "15-5555-5555",
				address: {
					country: "Argentina",
					province: "CABA",
					locality: "CABA",
					street: "Concordia",
					number: 2222,
					floor: null,
					department: null,
					postalCode: 1414,
				},
			},
			{
				_id: new ObjectId("000000000000000000000002"),
				firstName: "HumanResources",
				lastName: "UADE",
				email: "hr_uade@edusearch.com",
				password:
					"$2a$10$J3Qa3YiZTxXBX7NsSXMWmeVfrnsK7GXyCQM8sQ0VpSgvULxA/DOgO", //Password1
				role: "UHumanResources",
				university: new ObjectId("000000000000000000000001"),
				mediaUrl: null,
				idNumber: 10000002,
				birthDate: new Date("1990-05-29"),
				birthPlace: "Argentina",
				phone: "4444-4444",
				mobilePhone: "15-5555-5555",
				address: {
					country: "Argentina",
					province: "CABA",
					locality: "CABA",
					street: "Concordia",
					number: 2222,
					floor: null,
					department: null,
					postalCode: 1414,
				},
			},
			{
				_id: new ObjectId("000000000000000000000003"),
				firstName: "Admin",
				lastName: "UTN-INSPT",
				email: "admin_utninspt@edusearch.com",
				password:
					"$2a$10$J3Qa3YiZTxXBX7NsSXMWmeVfrnsK7GXyCQM8sQ0VpSgvULxA/DOgO", //Password1
				role: "UAdmin",
				university: new ObjectId("000000000000000000000000"),
				mediaUrl: null,
				idNumber: 10000003,
				birthDate: new Date("1990-05-29"),
				birthPlace: "Argentina",
				phone: "4444-4444",
				mobilePhone: "15-5555-5555",
				address: {
					country: "Argentina",
					province: "CABA",
					locality: "CABA",
					street: "Concordia",
					number: 2222,
					floor: null,
					department: null,
					postalCode: 1414,
				},
			},
			{
				_id: new ObjectId("000000000000000000000004"),
				firstName: "CouncilMember",
				lastName: "UTN-INSPT",
				email: "cm_utninspt@edusearch.com",
				password:
					"$2a$10$J3Qa3YiZTxXBX7NsSXMWmeVfrnsK7GXyCQM8sQ0VpSgvULxA/DOgO", //Password1
				role: "UCouncilMember",
				university: new ObjectId("000000000000000000000000"),
				mediaUrl: null,
				idNumber: 10000004,
				birthDate: new Date("1990-05-29"),
				birthPlace: "Argentina",
				phone: "4444-4444",
				mobilePhone: "15-5555-5555",
				address: {
					country: "Argentina",
					province: "CABA",
					locality: "CABA",
					street: "Concordia",
					number: 2222,
					floor: null,
					department: null,
					postalCode: 1414,
				},
			},
			{
				_id: new ObjectId("000000000000000000000005"),
				firstName: "HumanResources",
				lastName: "UTN-INSPT",
				email: "hr_utninspt@edusearch.com",
				password:
					"$2a$10$J3Qa3YiZTxXBX7NsSXMWmeVfrnsK7GXyCQM8sQ0VpSgvULxA/DOgO", //Password1
				role: "UHumanResources",
				university: new ObjectId("000000000000000000000000"),
				mediaUrl: null,
				idNumber: 10000005,
				birthDate: new Date("1990-05-29"),
				birthPlace: "Argentina",
				phone: "4444-4444",
				mobilePhone: "15-5555-5555",
				address: {
					country: "Argentina",
					province: "CABA",
					locality: "CABA",
					street: "Concordia",
					number: 2222,
					floor: null,
					department: null,
					postalCode: 1414,
				},
			},
			{
				_id: new ObjectId("000000000000000000000006"),
				firstName: "Teacher 06",
				lastName: "Test",
				email: "teacher_06@edusearch.com",
				password:
					"$2a$10$J3Qa3YiZTxXBX7NsSXMWmeVfrnsK7GXyCQM8sQ0VpSgvULxA/DOgO", //Password1
				role: "Teacher",
				university: null,
				mediaUrl: null,
				idNumber: 10000006,
				birthDate: new Date("1900-01-01"),
				birthPlace: "Argentina",
				phone: "6666-6666",
				mobilePhone: "15-6666-6666",
				address: {
					country: "Argentina",
					province: "CABA",
					locality: "CABA",
					street: "9 de julio",
					number: 1,
					floor: null,
					department: null,
					postalCode: 1006,
				},
			},
			{
				_id: new ObjectId("000000000000000000000007"),
				firstName: "Teacher 7",
				lastName: "Test",
				email: "teacher_7@edusearch.com",
				password:
					"$2a$10$J3Qa3YiZTxXBX7NsSXMWmeVfrnsK7GXyCQM8sQ0VpSgvULxA/DOgO", //Password1
				role: "Teacher",
				university: null,
				mediaUrl: null,
				idNumber: 10000007,
				birthDate: new Date("1900-01-01"),
				birthPlace: "Argentina",
				phone: "7777-7777",
				mobilePhone: "15-7777-7777",
				address: {
					country: "Argentina",
					province: "CABA",
					locality: "CABA",
					street: "9 de julio",
					number: 2222,
					floor: null,
					department: null,
					postalCode: 1007,
				},
			},
			{
				_id: new ObjectId("000000000000000000000008"),
				firstName: "Teacher 8",
				lastName: "Test",
				email: "teacher_8@edusearch.com",
				password:
					"$2a$10$J3Qa3YiZTxXBX7NsSXMWmeVfrnsK7GXyCQM8sQ0VpSgvULxA/DOgO", //Password1
				role: "Teacher",
				university: null,
				mediaUrl: null,
				idNumber: 10000008,
				birthDate: new Date("1900-01-01"),
				birthPlace: "Argentina",
				phone: "8888-8888",
				mobilePhone: "15-8888-8888",
				address: {
					country: "Argentina",
					province: "CABA",
					locality: "CABA",
					street: "9 de julio",
					number: 1,
					floor: null,
					department: null,
					postalCode: 1008,
				},
			},
			{
				_id: new ObjectId("000000000000000000000009"),
				firstName: "Teacher 9",
				lastName: "Test",
				email: "teacher_9@edusearch.com",
				password:
					"$2a$10$J3Qa3YiZTxXBX7NsSXMWmeVfrnsK7GXyCQM8sQ0VpSgvULxA/DOgO", //Password1
				role: "Teacher",
				university: null,
				mediaUrl: null,
				idNumber: 10000009,
				birthDate: new Date("1900-01-01"),
				birthPlace: "Argentina",
				phone: "9999-9999",
				mobilePhone: "15-9999-9999",
				address: {
					country: "Argentina",
					province: "CABA",
					locality: "CABA",
					street: "9 de julio",
					number: 1,
					floor: null,
					department: null,
					postalCode: 1009,
				},
			},
			{
				_id: new ObjectId("000000000000000000000010"),
				firstName: "Teacher 10",
				lastName: "Test",
				email: "teacher_10@edusearch.com",
				password:
					"$2a$10$J3Qa3YiZTxXBX7NsSXMWmeVfrnsK7GXyCQM8sQ0VpSgvULxA/DOgO", //Password1
				role: "Teacher",
				university: null,
				mediaUrl: null,
				idNumber: 10000010,
				birthDate: new Date("1900-01-01"),
				birthPlace: "Argentina",
				phone: "1010-1010",
				mobilePhone: "15-1010-1010",
				address: {
					country: "Argentina",
					province: "CABA",
					locality: "CABA",
					street: "9 de julio",
					number: 1,
					floor: null,
					department: null,
					postalCode: 1010,
				},
			},
		],
		done
	);
};

exports.down = (db, done) => {
	db.collection("users").deleteMany(
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
			{
				_id: new ObjectId("000000000000000000000005"),
			},
			{
				_id: new ObjectId("000000000000000000000006"),
			},
			{
				_id: new ObjectId("000000000000000000000007"),
			},
			{
				_id: new ObjectId("000000000000000000000008"),
			},
			{
				_id: new ObjectId("000000000000000000000009"),
			},
			{
				_id: new ObjectId("000000000000000000000010"),
			},
		],
		done
	);
};
