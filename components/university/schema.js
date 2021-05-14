const Address = require('../address');
const mongoose = require('mongoose')

const { Schema } = mongoose

const universitySchema = new Schema({
    name: { type: String, required: true },
    address: Address,
    logo: { type: String, required: true },
    url: { type: String, required: false },
});

module.exports = universitySchema
