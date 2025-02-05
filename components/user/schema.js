const mongoose = require('mongoose')
const validate = require('mongoose-validator')
const bcrypt = require('bcrypt')
const Address = require('../address');

const { Schema } = mongoose
const { ObjectId } = Schema.Types
const isEmail = validate({ validator: 'isEmail' })

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, validate: isEmail },
    password: { type: String, required: true, select: false},
    role: { type: String, required: true, enum: ['Teacher', 'UAdmin', 'UCouncilMember', 'UHumanResources'] },
    university: { type: ObjectId, ref: 'University' },
    mediaUrl: { type: String, required: false },
    idNumber: { type: String, required: true, unique: true },
    birthDate: { type: String, required: true, min: 6 },
    birthPlace:  { type: String, required: true, min: 6 },
    phone: { type: String, required: true, min: 6 },
    mobilePhone: { type: String, required: true, min: 6 },
    hasNotificationsEnabled: {type: Boolean, required: true, default: true},
    address: Address,
})

userSchema.pre('validate', function validate(next) {
    if (!this.password || !this.isModified('password')) {
        return next(null)
    }

    if (this.password.length < 8) {
        this.invalidate(
            'password',
            'Password must be longer than eight characters',
            undefined,
            'short'
        )
        return next(null)
    }

    if (!/[A-Za-z]/.test(this.password)) {
        this.invalidate(
            'password',
            'Password must contain at least one letter',
            undefined,
            'missingLetter'
        )
        return next(null)
    }

    if (!/[0-9]/.test(this.password)) {
        this.invalidate(
            'password',
            'Password must contain at least one number',
            undefined,
            'missingNumber'
        )
        return next(null)
    }

    if (this.email && this.password.toLowerCase().indexOf(this.email.toLowerCase()) > -1) {
        this.invalidate(
            'password',
            "Password cannot contain the user's email address",
            undefined,
            'containsEmail'
        )
        return next(null)
    }
})

userSchema.method('checkPassword', async function checkPassword(
    potentialPassword
) {
    if (!potentialPassword) {
        return Promise.reject(new Error('Password is required'))
    }

    const isMatch = await bcrypt.compare(potentialPassword, this.password)

    return { isOk: isMatch }
})

userSchema.statics.hashPassword = async function hashPassword(password) {
    return bcrypt.hash(password, 10)
  }
  
userSchema.static('verifyWithToken', async function verifyWithToken(
    rawVerificationToken,
    tokenTTL
  ) {
    const hash = crypto.createHash('sha1')
    hash.update(rawVerificationToken)
    const verificationToken = hash.digest('hex')
  
    const user = await this.findOne({ verificationToken })
  
    if (!user) {
      return { isOk: false }
    }
  
    if (user.verificationTokenSetAt && tokenTTL) {
      const verificationTokenSetAt = user.verificationTokenSetAt.getTime()
      const verificationTokenExpiresAt = verificationTokenSetAt + tokenTTL
  
      if (verificationTokenExpiresAt < Date.now()) {
        user.verificationTokenSetAt = undefined
        user.verificationToken = undefined
  
        await user.save()
        return { isOk: false, isExpired: true }
      }
    }
  
    user.isVerified = true
    user.verificationToken = undefined
  
    await user.save()
    return { isOk: true, user }
  })
  
  userSchema.method('generateVerificationToken', function generateVerificationToken() {
    return createRandomBytes(40).then(function(randomBytes) {
      const rawVerificationToken = randomBytes.toString('hex')
      const hash = crypto.createHash('sha1')
      hash.update(rawVerificationToken)
  
      this.verificationTokenSetAt = new Date()
      this.verificationToken = hash.digest('hex')
  
      return this.save().then(() => rawVerificationToken)
    })
  })

module.exports = userSchema