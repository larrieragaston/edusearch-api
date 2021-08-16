const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = Schema.Types

const favouriteSchema = new Schema({
  user: { type: ObjectId, ref: 'User' },
  contest: { type: ObjectId, ref: 'Contest' },
  date: { type: Date, required: true }
});

module.exports = favouriteSchema