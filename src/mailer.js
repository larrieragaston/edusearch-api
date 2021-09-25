const nodemailer = require('nodemailer')

class Mailer {
  constructor(config, logger) {
    this.config = config
    this.logger = logger.child({ context: 'Mailer' })
    this.logger.verbose('Creating nodemailer transport')

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.sender.user,
        pass: config.sender.pass
      }
    })

    this.logger.verbose('Nodemailer transport created')
  }

  send({ to, from, subject, text }) {
    this.logger.verbose(`Sending email to ${to}`)

    return this.transporter.sendMail({
      from,
      to,
      subject,
      text
    })
  }
}

module.exports = Mailer
