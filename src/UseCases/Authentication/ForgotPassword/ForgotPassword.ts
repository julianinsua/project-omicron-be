import { GenericHandler } from 'src/Entities/Models/Server/GenericHandler'
import UserService from 'src/services/db/UserService'
import { mailingService } from 'src/services/mail/MailingService'
import { HTTP_CODES, requestInterface } from 'src/Entities/Interfaces/RouterInterfaces'
import { forgotPasswordInterface } from 'src/Entities/Interfaces/UserInterfaces'
import User from 'src/Entities/Models/User'
import CryptService from 'src/services/crypt/CryptService'
import { validEmail } from 'src/util/constants/regularExpressions'
import {
  INVALID_RESET_DATA,
  INVALID_EMAIL,
  REQUIRE_EMAIL,
} from 'src/Entities/Exeptions/ExeptionCodes'

class ForgotPassword extends GenericHandler {
  private cryptService: CryptService
  private userService: UserService

  public constructor(req: requestInterface) {
    super(req)

    this.userService = new UserService()
    this.cryptService = new CryptService()
  }

  private validate() {
    const { email } = this.req.body as forgotPasswordInterface
    let validationErrors: Record<string, any> = {}
    if (!email) validationErrors.email = REQUIRE_EMAIL
    if (!validEmail.test(email)) validationErrors.email = INVALID_EMAIL

    if (Object.keys(validationErrors).length > 0) {
      this.throwError(INVALID_RESET_DATA, HTTP_CODES.badRequest, INVALID_EMAIL, {
        error: { validationErrors },
      })
    }

    return
  }

  async handleRequest(): Promise<Object | Error> {
    try {
      this.validate()
      const { email } = this.req.body as forgotPasswordInterface
      const dbUser = await this.userService.findByEmail(email)
      if (!dbUser) {
        this.throwError(INVALID_RESET_DATA, HTTP_CODES.notFound, INVALID_EMAIL)
      }
      const user = User.fromDatabase(dbUser)

      user.setRestoreData(this.cryptService.generateRandomToken())

      await this.userService.save(user)

      const emailData = {
        from: 'recover@omicronproject.com',
        to: email,
        subject: 'Reset your password from project Omicron',
        body: `<p>Oops! You forgot your password. Don't worry, we have your back. Click on this <a href='${user.getResetToken}'>link</a> and choose a new one</p>`,
      }
      const response = await mailingService.sendMail(emailData)
      return {
        message: `Reset password email was sent to ${email}`,
        data: { email, resetToken: user.getResetToken },
        response,
      }
    } catch (e) {
      throw this.genericErrorHandler(e)
    }
  }
}

export default ForgotPassword
