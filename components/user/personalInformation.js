const Address = require('../address');

const personalInformationSchema = {
  idNumber: { type: String, required: true, unique: true },
  birthDate: { type: String, required: true, min: 6 },
  birthPlace:  { type: String, required: true, min: 6 },
  phone: { type: String, required: true, min: 6 },
  mobilePhone: { type: String, required: true, min: 6 },
  address: Address,
};

module.exports = personalInformationSchema;
