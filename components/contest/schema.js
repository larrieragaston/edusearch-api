const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = Schema.Types

const contestSchema = new Schema({
  university: { type: ObjectId, ref: 'University' },
  career: { type: ObjectId, ref: 'Career' },
  subject: { type: ObjectId, ref: 'Subject' },
  day: { type: String, required: true },
  startsAt: { type: String, required: true },
  endsAt: { type: String, required: true },
  dueDate: { type: Date, required: true },
  isDraft: { type: Boolean, required: true },
  isClosed: { type: Boolean, required: true },
  requirements:  { type : Array , "default" : [] },
  hasColloquium: { type: Boolean, required: true, "default": false},
  activeStage: { type: Number, required: true, "default": 0},
  showResultsScore: { type: Boolean, required: true, "default": false}
});

module.exports = contestSchema
