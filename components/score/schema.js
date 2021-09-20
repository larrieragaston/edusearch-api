const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = Schema.Types

const scoreSchema = new Schema({
  university: { type: ObjectId, ref: 'University' },
  type: {
    type: String,
    required: true,
    enum: [
      "Degree",
      "FurtherTraining",
      "Scholarship",
      "TeachingBackground",
      "ManagementBackground",
      "ResearchBackground",
      "HRBackground",
      "EvaluationBackground",
      "STBackground",
      "AcademicProduction",
      "Award",
      "Other",
    ],
  },
  subType: {
    type: String,
    required: false,
    enum: [
      "Secondary",
      "NonUniversitary",
      "NonUniversitary-PostTitle",
      "Grade",
      "Postgraduate-Specialization",
      "Postgraduate-Master",
      "Postgraduate-Doctorate",
    ],
  },
  score: { type: Number, required: true }
});

module.exports = scoreSchema
