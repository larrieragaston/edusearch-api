const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = Schema.Types

const teacherContestsSchema = new Schema({
  university: { type: ObjectId, ref: 'University' },
  career: { type: ObjectId, ref: 'Career' },
  subject: { type: ObjectId, ref: 'Subject' },
  day: { type: String, required: true },
  startsAt: { type: String, required: true },
  endsAt: { type: String, required: true },
  createdDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  active: { type: Boolean, required: true },
});

module.exports = teacherContestsSchema
