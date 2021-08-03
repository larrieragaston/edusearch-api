const { Router } = require('express')
const jwt = require('jsonwebtoken')
const authenticate = require('../../src/authentication')

const router = new Router()

router.post('/users/login', createUserToken)
// router.post('/users', authenticate, createUser)
// router.post('/users/university/:universityId', authenticate, createUniversityUser)
// router.get('/users/university/:universityId', authenticate, findUsersByUniversity)
// router.get('/users/:id([0-9a-f]{24})', authenticate, findUserById)
router.get('/users/me', authenticate, findUserByToken)
router.put('/users/me', authenticate, updateUserByToken)
// router.get('/users/personalInformation', authenticate, findUserPersonalInformation)
// router.put('/users/:id', authenticate, updateUserById)
// router.post('/users/verify/:token', verifyUserWithToken)
// router.put('/users/:id([0-9a-f]{24})/password-reset', authenticate, updateUserPassword)
// router.put('/users/password/:token', resetUserPassword)
// router.put('/users/:email/password-reset', sendUserPasswordResetByEmail)
// router.get('/users/updateUser', authenticate, updateUser)

async function createUserToken(req, res, next) {
  req.logger.info(`Creating user token`)

  if (!req.body.email) {
    req.logger.verbose('Missing email parameter. Sending 404 to client')
    return res.status(400).end()
  }

  if (!req.body.password) {
    req.logger.info('Missing password parameter. Sending 404 to client')
    return res.status(400).end()
  }

  try {
    const user = await req.model('User').findOne({ email: req.body.email }, '+password')

    if (!user) {
      req.logger.verbose('User not found. Sending 404 to client')
      return res.status(404).end()
    }

    req.logger.verbose('Checking user password')
    const { passwordTtl } = req.config.auth
    const result = await user.checkPassword(req.body.password, passwordTtl)

    // if (result.isLocked) {
    //   req.logger.verbose('User is locked. Sending 423 (Locked) to client')
    //   return res.status(423).end()
    // }

    if (!result.isOk) {
      req.logger.verbose('User password is invalid. Sending 401 to client')
      return res.status(401).end()
    }

    // if (result.isExpired) {
    //   req.logger.verbose('User password is expired. Sending 403 to client')
    //   return res.status(403).end()
    // }

    // const role = await req.model('Role').findById(user.role).populate('permissions').exec()

    const payload = {
      _id: user._id,
      role: user.role
    }

    const token = jwt.sign(payload, req.config.auth.token.secret, {
      expiresIn: req.config.auth.token.ttl
    })

    res.status(201).send({ token: `Bearer ${token}`, user: user.toJSON() })
  } catch (err) {
    next(err)
  }
}

async function createUser(req, res, next) {
  req.logger.info('Creating user', req.body)
  try {
    const user = await Promise.all(req.model('User').create({ ...req.body, university: null }))

    const verificationToken = await user.generateVerificationToken()
    const passwordResetToken = await user.generatePasswordResetToken()

    await req.mailer.send({
      from: req.config.sender.email,
      to: user.email,
      subject: 'Bienvenido a EduSearh',
      html: req.mailer.getInviteTemplate(verificationToken, passwordResetToken)
    })

    req.logger.verbose('Sending invitation to teacher')
    res.json(user)
  } catch (err) {
    next(err)
  }
}

async function createUniversityUser(req, res, next) {
    req.logger.info('Creating user', req.body)
    try {
      const [university, user] = await Promise.all([
        req.model('University').findById(req.params.universityId),
        req.model('User').create({ ...req.body, university: req.params.universityId })
      ])
  
      const verificationToken = await user.generateVerificationToken()
      const passwordResetToken = await user.generatePasswordResetToken()
  
      await req.mailer.send({
        from: university.email,
        to: user.email,
        subject: `Invitacion ${university.name} a EduSearch`,
        html: req.mailer.getInviteTemplate(verificationToken, passwordResetToken)
      })
  
      req.logger.verbose('Sending invitation to university user')
      res.json(user)
    } catch (err) {
      next(err)
    }
  }

async function findUsersByUniversity(req, res, next) {
    req.logger.info('University users', req.query)
    try {
      const result = await req.model('User').paginate(
        { ...req.query, university: req.params.universityId },
        {
          select: req.select,
          sort: req.sort,
          populate: req.populate,
          offset: req.offset,
          limit: req.limit
        }
      )
  
      req.logger.verbose('Sending users to client')
      res.json(result)
    } catch (err) {
      next(err)
    }
  }

async function findUserById(req, res, next) {
  req.logger.info(`Finding user with id ${req.params.id}`)

  try {
    const user = await req
      .model('User')
      .findOne({ _id: req.params.id })
      .lean()
      .exec()

    if (!user) {
      req.logger.verbose('User not found. Sending 404 to client')
      return res.status(404).end()
    }

    req.logger.verbose('Sending user to client')
    res.json(user)
  } catch (err) {
    next(err)
  }
}

async function findUserByToken(req, res, next) {
  req.logger.info(`Finding user with id ${req.user._id} using auth token`)

  try {
    const user = await req
      .model('User')
      .findOne({ _id: req.user._id })
      .lean()
      .exec()

    if (!user) {
      req.logger.verbose('User not found. Sending 404 to client')
      return res.status(404).end()
    }

    req.logger.verbose('Sending user session to client')
    res.json(user)
  } catch (err) {
    next(err)
  }
}

async function findUserPersonalInformation(req, res, next) {
  req.logger.info(`Finding user with id ${req.user._id} using auth token`)

  try {
    const user = await req
      .model('User')
      .findOne({ _id: req.user._id })
      .lean()
      .exec()

    if (!user) {
      req.logger.verbose('User not found. Sending 404 to client')
      return res.status(404).end()
    }

    req.logger.verbose('Sending user session to client')
    res.json(user)
  } catch (err) {
    next(err)
  }
}

async function updateUserById(req, res, next) {
  req.logger.info(`Updating user with id ${req.params.id}`)
  try {
    const results = await req
      .model('User')
      .update({ _id: req.params.id }, req.body)

    if (results.n < 1) {
      req.logger.verbose('User not found')
      return res.status(404).end()
    }

    req.logger.verbose('User updated')
    res.status(204).end()
  } catch (err) {
    next(err)
  }
}

async function removeUserById(req, res, next) {
  req.logger.info(`Removing user with id ${req.params.id}`)
  try {
    if (req.user._id.toString() === req.params.id) {
      return res.status(403).end()
    }

    const user = await req
      .model('User')
      .findOne({ _id: req.params.id, organization: req.params.organizationId })
      .populate('role')

    if (!req.hasPermission(`${user.role.name}.remove`)) {
      return res.status(403).end()
    }

    const results = await req
      .model('User')
      .remove({ _id: req.params.id, organization: req.params.organizationId })

    if (results.nModified < 1) {
      req.logger.verbose('User not found')
      return res.status(404).end()
    }

    req.logger.verbose('User removed')
    res.status(204).end()
  } catch (err) {
    next(err)
  }
}

async function verifyUserWithToken(req, res, next) {
  req.logger.info(`Verifying user with token req.params.token`)

  try {
    const result = await req
      .model('User')
      .verifyWithToken(req.params.token, req.config.auth.verificationTokenTtl)

    if (result.isExpired) {
      req.logger.verbose('Token is expired')
      return res.status(403).end()
    }

    if (!result.isOk) {
      req.logger.verbose('Invalid verification token')
      return res.status(404).end()
    }

    req.logger.verbose('User verified. Sending 204 to client')
    res.status(204).end()
  } catch (err) {
    next(err)
  }
}

async function resetUserPassword(req, res, next) {
  req.logger.info('Applying password reset for user by token')
  if (!req.body.password) {
    const err = new Error('Password is required')
    err.statusCode = 400
    return next(err)
  }

  req.logger.verbose('Finding user and applying password reset')

  try {
    const result = await req
      .model('User')
      .applyPasswordResetWithToken(
        req.params.token,
        req.body.password,
        req.config.auth.verificationTokenTtl
      )

    if (result.isLocked) {
      req.logger.verbose('User is locked')
      return res.status(423).end()
    }

    if (result.isExpired) {
      req.logger.verbose('Password reset token is expired')
      return res.status(403).end()
    }

    if (!result.isOk) {
      req.logger.verbose('Password reset token is incorrect')
      return res.status(401).end()
    }

    req.logger.verbose('User password has been reset. Sending 204 to client')
    res.status(204).end()
  } catch (err) {
    next(err)
  }
}

async function sendUserPasswordResetByEmail(req, res, next) {
  req.logger.info(`Sending password reset email to user with email ${req.params.email}`)

  try {
    const user = await req.model('User').findOne({ email: req.params.email })

    if (!user) {
      req.logger.verbose('User not found. Sending 404 to client')
      return res.status(404).end()
    }

    const passwordResetToken = await user.generatePasswordResetToken()

    await req.mailer.send({
      from: req.config.mailer.mainEmail,
      to: user.email,
      subject: 'Restablecer contraseña',
      html: req.mailer.getResetPasswordTemplate(passwordResetToken, user)
    })

    req.logger.verbose('User password reset email has been sent. Sending 204 to client')
    res.status(204).end()
  } catch (err) {
    next(err)
  }
}

async function updateUserPassword(req, res, next) {
  req.logger.info(`Updating password for user with id: ${req.user._id}`)

  if (!req.body.newPassword) {
    const err = new Error('newPassword is required')
    err.statusCode = 400
    return next(err)
  }

  if (!req.body.currentPassword) {
    const err = new Error('currentPassword is required')
    err.statusCode = 400
    return next(err)
  }

  req.logger.verbose(`Finding user with id: ${req.user._id}`)

  try {
    const user = await req
      .model('User')
      .findById(req.user._id)
      .select('+password')
      .select('+previousPasswords')

    if (!user) {
      req.logger.verbose('User not found')
      return res.status(404).end()
    }

    req.logger.verbose('Checking the user password')
    const result = await user.checkPassword(req.body.currentPassword)

    if (result.isLocked) {
      req.logger.verbose('User is locked')
      return res.status(423).end()
    }

    if (!result.isOk) {
      req.logger.verbose('Password incorrect')
      return res.status(401).end()
    }

    req.logger.verbose('Setting new password')

    user.password = req.body.newPassword
    await user.save()

    req.logger.verbose('Password set successfully')
    res.status(204).end()
  } catch (err) {
    next(err)
  }
}

async function updateUserByToken(req, res, next) {
  req.logger.info(`Updating user with id: ${req.user._id}`)
  try {
    // if (req.body.password) {
    //   req.body.password = await req.model('User').hashPassword(req.body.password)
    // }
    const results = await req.model('User').update({ _id: req.user._id }, req.body)

    if (results.n < 1) {
      req.logger.verbose('User not found')
      return res.status(404).end()
    }

    const user = await req.model('User').findOne({ _id: req.user._id })

    req.logger.verbose('User updated')

    return res.json({ user })
  } catch (err) {
    return next(err)
  }
}

module.exports = router
