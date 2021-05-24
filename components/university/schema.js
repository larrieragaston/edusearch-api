const Address = require('../address');
const mongoose = require('mongoose')
const validate = require('mongoose-validator')

const { Schema } = mongoose
const isEmail = validate({ validator: 'isEmail' })

const universitySchema = new Schema({
    name: { type: String, required: true, unique: true },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: isEmail
      },
    address: Address,
    logo: { type: String, required: true },
    url: { type: String, required: false },
});

module.exports = universitySchema
