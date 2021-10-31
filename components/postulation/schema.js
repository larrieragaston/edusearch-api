const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = Schema.Types

const postulationSchema = new Schema({
  user: { type: ObjectId, ref: 'User' },
  contest: { type: ObjectId, ref: 'Contest' },
  date: { type: Date, required: true },
  postulationScore: { type: Number, required: false}
});

module.exports = postulationSchema