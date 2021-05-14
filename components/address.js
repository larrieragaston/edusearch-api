const address = {
    country: { type: String, required: true},
    province: { type: String, required: true},
    locality: { type: String, required: true},
    street: { type: String, required: true},
    number: { type: Number, required: true},
    floor: { type: String, required: false},
    department: { type: String, required: false},
    postalCode: { type: String, required: true},
};

module.exports = address
