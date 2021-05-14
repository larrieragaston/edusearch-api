const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = Schema.Types

const careerSchema = new Schema({
  university: { type: ObjectId, ref: 'University' },
  name: { type: String, required: true },
  logo: { type: String, required: true },
  url: { type: String, required: false }
});

module.exports = careerSchema
