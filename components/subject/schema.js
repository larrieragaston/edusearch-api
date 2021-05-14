const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = Schema.Types

const subjectSchema = new Schema({
  career: { type: ObjectId, ref: 'Career' },
  name: { type: String, required: true },
  curriculum: {type: String, required: true },
});

module.exports = subjectSchema
