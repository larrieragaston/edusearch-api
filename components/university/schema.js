const Address = require("../address");
const mongoose = require("mongoose");
const validate = require("mongoose-validator");

const { Schema } = mongoose;
const isEmail = validate({ validator: "isEmail" });

const universitySchema = new Schema({
	name: { type: String, required: true, unique: true },
	acronyms: { type: String, required: false },
	address: Address,
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		trim: true,
		validate: isEmail,
	},
	phoneNumber: { type: String, required: false },
	url: { type: String, required: false },
	level: { type: String, required: false },
	logoUrl: { type: String, required: false },
});

module.exports = universitySchema;
