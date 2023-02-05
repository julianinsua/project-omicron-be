import { GenericHandler } from 'src/Entities/Models/Server/GenericHandler'
import { HTTP_CODES, requestInterface } from 'src/Entities/Interfaces/RouterInterfaces'
import { resetPasswordInterface } from 'src/Entities/Interfaces/UserInterfaces'
import UserService from 'src/services/db/UserService'
import User from 'src/Entities/Models/User'
import CryptService from 'src/services/crypt/CryptService'
import {
  BAD_TOKEN,
  BAD_TOKEN_MSG,
  ENTITY_NOT_FOUND,
  INVALID_RESET_DATA,
  MISMATCH_PASSWORDS,
} from 'src/Entities/Exeptions/ExeptionCodes'

class ResetPassword extends GenericHandler {
  cryptService: CryptService
  userService: UserService

  constructor(req?: requestInterface) {
    super(req)
    this.userService = new UserService()
    this.cryptService = new CryptService()
  }

  private validate() {
    const { password, repeatPassword } = this.req?.body as resetPasswordInterface
    let validationErrors: Record<string, any> = {}
    if (password !== repeatPassword) {
      validationErrors.password = MISMATCH_PASSWORDS
      throw this.throwError(
        INVALID_RESET_DATA,
        HTTP_CODES.unprocessableEntity,
        MISMATCH_PASSWORDS,
        {
          error: { validationErrors },
        }
      )
    }
  }

  async handleRequest(): Promise<Object | Error> {
    try {
      this.validate()
      const { token, email, password } = this.req?.body as resetPasswordInterface

      const dbUser = await this.userService.findByEmail(email)
      if (!dbUser) {
        throw this.throwError(INVALID_RESET_DATA, HTTP_CODES.notFound, ENTITY_NOT_FOUND, {
          error: { validationErrors: { email: 'Wrong email' } },
        })
      }

      const user = User.fromDatabase(dbUser)
      if (!user.validateReset(token)) {
        throw this.throwError(BAD_TOKEN, HTTP_CODES.unprocessableEntity, BAD_TOKEN_MSG)
      }
      user.setPassword(await this.cryptService.hashPassword(password))
      user.clearRestoreData()
      return this.userService.save(user)
    } catch (e) {
      throw this.genericErrorHandler(e)
    }
  }
}

export default ResetPassword
