const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = Schema.Types

const subjectSchema = new Schema({
  career: { type: ObjectId, ref: 'Career' },
  name: { type: String, required: true },
  periodType: {type: String, required: true, enum: ['Yearly','Quarterly','Bimonthly']},
  curriculum: {type: String, required: true },
});

module.exports = subjectSchema
