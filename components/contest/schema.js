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
  active: { type: Boolean, required: true },
  requirements:  { type : Array , "default" : [] },
  hasColloquium: { type: Boolean, required: true, "default": false},
  activeStage: { type: Number, required: true, "default": 0}
});

module.exports = contestSchema
