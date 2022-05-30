import { createTransport, Transporter } from 'nodemailer'
// @ts-ignore
import sendgridTransport from 'nodemailer-sendgrid-transport' //no types for this one
import { EmailData } from 'src/Entities/Interfaces/MailingInterfaces'
import { HTTP_CODES } from 'src/Entities/Interfaces/RouterInterfaces'
import * as dotenv from 'dotenv'
dotenv.config()
// doteng config is required here to make the MAILING_KEY work, but why?

export class MailingService {
  private client: Transporter

  constructor(client: Transporter) {
    this.client = client
  }

  public async sendMail(emailData: EmailData) {
    try {
      const { to, from, subject, body } = emailData
      if (!to) {
        throw {
          error: new Error("Couldn't get the recipient for the outgoing mail"),
          status: HTTP_CODES.internal,
        }
      }

      await this.client.sendMail({ to, from, subject, html: body })
      return { message: 'Reset password mail sent successfully' }
    } catch (e: any) {
      console.log(e)
      if (!e.status) {
        throw { error: new Error('Internal mailing service error'), status: HTTP_CODES.internal }
      } else {
        throw { error: new Error("Can't send your mail"), status: HTTP_CODES.internal }
      }
    }
  }
}

const options = {
  auth: {
    api_key: process.env.MAILING_KEY,
  },
}

const client = createTransport(sendgridTransport(options))

export const mailingService = new MailingService(client)
