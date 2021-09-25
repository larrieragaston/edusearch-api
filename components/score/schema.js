const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const scoreSchema = new Schema({
	university: { type: ObjectId, ref: "University" },
	degreeSecondary: { type: Number, required: false },
	degreeNonUni: { type: Number, required: false },
	degreeNonUniPostTitle: { type: Number, required: false },
	degreeGrade: { type: Number, required: false },
	degreePostgraSpecial: { type: Number, required: false },
	degreePostgraMaster: { type: Number, required: false },
	degreePostgraDoctorate: { type: Number, required: false },
	furtherTraining: { type: Number, required: false },
	scholarship: { type: Number, required: false },
	teachingBackground: { type: Number, required: false },
	managementBackground: { type: Number, required: false },
	researchBackground: { type: Number, required: false },
	hRBackground: { type: Number, required: false },
	evaluationBackground: { type: Number, required: false },
	sTBackground: { type: Number, required: false },
	academicProduction: { type: Number, required: false },
	award: { type: Number, required: false },
	other: { type: Number, required: false },
});

module.exports = scoreSchema;
