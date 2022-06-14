import CryptService from 'src/services/crypt/CryptService'
import UserService from 'src/services/db/UserService'
import { mailingService } from 'src/services/mail/MailingService'
import { GenericHandler } from 'src/Entities/Models/Server/GenericHandler'
import User from 'src/Entities/Models/User'
import { signupInterface } from 'src/Entities/Interfaces/UserInterfaces'
import { HTTP_CODES, requestInterface } from 'src/Entities/Interfaces/RouterInterfaces'
import {
  INTERNAL_ERROR,
  INVALID_SIGNUP_DATA,
  INVALID_SIGNUP_DATA_MSG,
  MISMATCH_PASSWORDS,
  UNABLE_TO_CREATE_ENTITY,
  USER_IS_REGISTRED,
  USER_IS_REGISTRED_MSG,
} from 'src/Entities/Exeptions/ExeptionCodes'
class Signup extends GenericHandler {
  userService: UserService
  cryptService: CryptService

  constructor(req: requestInterface) {
    super(req)
    this.userService = new UserService()
    this.cryptService = new CryptService()
  }

  private validate() {
    const { password, repeatPassword } = this.req.body as signupInterface
    let validationErrors: Record<string, any> = {}
    if (password !== repeatPassword) {
      validationErrors.password = MISMATCH_PASSWORDS
    }

    if (Object.keys(validationErrors).length > 0) {
      this.throwError(INVALID_SIGNUP_DATA, HTTP_CODES.badRequest, INVALID_SIGNUP_DATA_MSG)
    }
  }

  async handleRequest() {
    try {
      this.validate()
      const { email, password } = this.req.body as signupInterface

      const existingUser = await this.userService.findByEmail(email)

      if (existingUser) {
        this.throwError(USER_IS_REGISTRED, HTTP_CODES.unprocessableEntity, USER_IS_REGISTRED_MSG)
      }

      const user = User.createUser(email, password)
      if (!(user instanceof User)) {
        this.throwError(
          INVALID_SIGNUP_DATA,
          HTTP_CODES.unprocessableEntity,
          INVALID_SIGNUP_DATA_MSG
        )
      }

      const createdUser = await this.userService.save(user as User)
      if (!createdUser) {
        this.throwError(INTERNAL_ERROR, HTTP_CODES.internal, UNABLE_TO_CREATE_ENTITY, {
          error: { user },
        })
      }

      const emailData = {
        from: 'signup@omicronproject.com',
        to: createdUser.email,
        subject: 'Signup to project omicron',
        body: `<p>Just sending you an email to check your authentication data. If this was you, click here! Else, disregard this email</p>`,
      }
      const mailingResponse = await mailingService.sendMail(emailData)

      return { status: HTTP_CODES.ok, data: { createdUser, mailingResponse } }
    } catch (e: any) {
      this.genericErrorHandler(e)
    }
  }
}

export default Signup
