import { GenericHandler } from 'src/Entities/Models/Server/GenericHandler'
import UserService from 'src/services/db/UserService'
import { mailingService } from 'src/services/mail/MailingService'
import { HTTP_CODES, requestInterface } from 'src/Entities/Interfaces/RouterInterfaces'
import { forgotPasswordInterface } from 'src/Entities/Interfaces/UserInterfaces'
import User from 'src/Entities/Models/User'
import CryptService from 'src/services/crypt/CryptService'

class ForgotPassword extends GenericHandler {
  private cryptService: CryptService
  private userService: UserService

  public constructor(req: requestInterface) {
    super(req)

    this.userService = new UserService()
    this.cryptService = new CryptService()
  }

  async handleRequest(): Promise<Object | Error> {
    try {
      const { email } = this.req.body as forgotPasswordInterface
      const dbUser = await this.userService.findByEmail(email)
      if (!dbUser) {
        this.throwError(HTTP_CODES.notFound, "User couldn't be found")
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
      }
    } catch (e) {
      throw this.genericErrorHandler(e)
    }
  }
}

export default ForgotPassword
