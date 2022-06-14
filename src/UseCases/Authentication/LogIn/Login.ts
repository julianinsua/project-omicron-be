import { GenericHandler } from 'src/Entities/Models/Server/GenericHandler'
import { HTTP_CODES, requestInterface } from 'src/Entities/Interfaces/RouterInterfaces'
import UserService from 'src/services/db/UserService'
import CryptService from 'src/services/crypt/CryptService'
import { loginInterface } from 'src/Entities/Interfaces/UserInterfaces'
import User from 'src/Entities/Models/User'
import { validEmail, validPassword } from 'src/util/constants/regularExpressions'
import {
  INVALID_EMAIL,
  INVALID_LOGIN,
  INVALID_LOGIN_MSG,
  INVALID_PASSWORD,
  REQUIRE_EMAIL,
  REQUIRE_PASSWORD,
  WRONG_LOGIN_DATA,
  WRONG_LOGIN_DATA_MSG,
} from 'src/Entities/Exeptions/ExeptionCodes'
import BaseError from 'src/Entities/Exeptions/BaseError'

class Login extends GenericHandler {
  userService: UserService
  cryptService: CryptService

  public constructor(req: requestInterface) {
    super(req)
    this.userService = new UserService()
    this.cryptService = new CryptService()
  }

  private validate() {
    const { email, password } = this.req.body as loginInterface
    const validationErrors: Record<string, any> = {}
    if (!email) validationErrors.email = REQUIRE_EMAIL
    if (!password) validationErrors.password = REQUIRE_PASSWORD
    if (!validEmail.test(email)) validationErrors.email = INVALID_EMAIL
    if (!validPassword.test(password)) validationErrors.password = INVALID_PASSWORD

    if (Object.keys(validationErrors).length > 0) {
      this.throwError(INVALID_LOGIN, HTTP_CODES.badRequest, INVALID_LOGIN_MSG, {
        error: { validationErrors },
      })
    }

    return
  }

  async handleRequest(): Promise<Object | BaseError> {
    try {
      this.validate()
      const { email, password } = this.req.body as loginInterface
      const userDB = await this.userService.findByEmail(email)

      if (!userDB) {
        this.throwError(INVALID_LOGIN, HTTP_CODES.notAuthenticated, INVALID_LOGIN_MSG)
      }

      const user = User.fromDatabase(userDB)
      const isEqual = await this.cryptService.comparePassword(password, user.pass)
      if (!isEqual) {
        this.throwError(WRONG_LOGIN_DATA, HTTP_CODES.notAuthenticated, WRONG_LOGIN_DATA_MSG)
      }
      const token = await this.cryptService.generateUserToken(user.tokenData)
      return {
        data: { id: user.id, email: user.email, token, permissions: ['yes'] },
        status: HTTP_CODES.ok,
        timestamp: new Date().toISOString(),
      }
    } catch (e) {
      throw this.genericErrorHandler(e)
    }
  }
}

export default Login
