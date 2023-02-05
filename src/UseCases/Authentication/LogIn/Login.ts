import { GenericHandler } from 'src/Entities/Models/Server/GenericHandler'
import { HTTP_CODES, requestInterface } from 'src/Entities/Interfaces/RouterInterfaces'
import UserService from 'src/services/db/UserService'
import CryptService from 'src/services/crypt/CryptService'
import { loginInterface } from 'src/Entities/Interfaces/UserInterfaces'
import {
  INVALID_LOGIN,
  INVALID_LOGIN_MSG,
  WRONG_LOGIN_DATA,
  WRONG_LOGIN_DATA_MSG,
} from 'src/Entities/Exeptions/ExeptionCodes'
import BaseError from 'src/Entities/Exeptions/BaseError'
import LogInService from 'src/UseCases/Authentication/LogIn/LogInService'
import { validateEmail, validatePassword } from 'src/services/validation/validationService'

class Login extends GenericHandler {
  userService: UserService
  cryptService: CryptService
  logInService: LogInService

  public constructor(req?: requestInterface) {
    super(req)
    this.userService = new UserService()
    this.cryptService = new CryptService()
    this.logInService = new LogInService()
  }

  private validate() {
    try {
      const { email, password } = this.req?.body as loginInterface
      const validationErrors: Record<string, any> = Object.assign(
        {},
        validateEmail(email),
        validatePassword(password)
      )

      if (Object.keys(validationErrors).length > 0) {
        this.throwError(INVALID_LOGIN, HTTP_CODES.badRequest, INVALID_LOGIN_MSG, {
          error: { validationErrors },
        })
      }
    } catch (e) {
      this.throwError(WRONG_LOGIN_DATA, HTTP_CODES.notAuthenticated, WRONG_LOGIN_DATA_MSG)
    }
  }

  async handleRequest(): Promise<Object | BaseError> {
    try {
      this.validate()
      const { email, password } = this.req?.body as loginInterface

      const user = await this.logInService.getValidUser(email, password)

      const isEqual = await this.cryptService.comparePassword(password, user.pass)
      if (!isEqual) {
        this.throwError(WRONG_LOGIN_DATA, HTTP_CODES.notAuthenticated, WRONG_LOGIN_DATA_MSG)
      }
      const token = await this.cryptService.generateUserToken(user.tokenData)

      return {
        data: { id: user.id, email: user.email, token, permissions: user.permissions },
        status: HTTP_CODES.ok,
        timestamp: new Date().toISOString(),
      }
    } catch (e) {
      throw this.genericErrorHandler(e)
    }
  }
}

export default Login
