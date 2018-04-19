const nodeMailer = require('nodemailer')

class KuzzleMailer {
    
  constructor () {
    this.context = null
    this.scope = {}
    this.config = null
    this.mailer = null

    this.controllers = {
      mailController: {
        sendEmail: 'sendEmail'
      }
    }

    this.routes = [
      {verb: 'post', url: '/sendEmail', controller: 'mailController', action: 'sendEmail'}
    ]
  }

  init (customConfig, context) {
    this.config = Object.assign({}, this.config, customConfig)

    this.context = context

    if (!this.config.hasOwnProperty('transporter')) {
      console.error('[KuzzleMailer] Missing configuration for building the mailer')

      return
    }

    console.dir(`[KuzzleMailer] Loaded configuration: ${JSON.stringify(this.config)}`)

    this.mailer = nodeMailer.createTransport(this.config.transporter, this.config.default_options)
  }

  /**
   * Use parameters taken from Request and propagate them to nodemailer
   * 
   * @param {KuzzleRequest} request 
   */
  sendEmail (request) {
    if (!this.mailer) {
      return Promise.reject(`[KuzzleMailer] The mailer is not configured`)
    }

    if (!request.input.body) {
      return Promise.reject(`[KuzzleMailer] Missing payload`)
    }

    if (!request.input.body.hasOwnProperty('to')) {
      return Promise.reject(`[KuzzleMailer] Missing 'to' parameter`)
    }

    let params = Object.assign({}, request.input.body)

    return new Promise((resolve, reject) => {
      this.mailer.sendMail(params, (error, info) => {
        if (error) {
          return reject(error)
        }
  
        return resolve(info)
      })
    })
  }
}

module.exports = KuzzleMailer;