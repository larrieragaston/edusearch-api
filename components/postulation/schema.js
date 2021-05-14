const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = Schema.Types

const postulationSchema = new Schema({
  user: { type: ObjectId, ref: 'User' },
  contests: { type: ObjectId, ref: 'TeacherContest' },
  date: { type: Date, required: true }
});

module.exports = postulationSchema