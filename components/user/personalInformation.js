const Address = require('../address');

const personalInformationSchema = {
  identificationDocument: { type: String, required: true, unique: true },
  birthDate: { type: String, required: true, min: 6 },
  phoneNumber: { type: String, required: true, min: 6 },
  phoneNumber2: { type: String, required: true, min: 6 },
  address: Address,
};

module.exports = personalInformationSchema;
