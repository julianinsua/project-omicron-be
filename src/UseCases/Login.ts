import { GenericHandler } from 'src/Entities/Models/Server/GenericHandler'
import { HTTP_CODES, requestInterface } from 'src/Entities/Interfaces/RouterInterfaces'
import UserService from 'src/services/db/UserService'
import CryptService from 'src/services/crypt/CryptService'
import { loginInterface } from 'src/Entities/Interfaces/UserInterfaces'
import { Error } from 'src/Entities/Interfaces/CommonInterfaces'
import User from 'src/Entities/Models/User'

class Login extends GenericHandler {
  userService: UserService
  cryptService: CryptService

  public constructor(req: requestInterface) {
    super(req)
    this.userService = new UserService()
    this.cryptService = new CryptService()
  }

  async handleRequest(): Promise<Object | Error> {
    try {
      const { email, password } = this.req.body as loginInterface
      const userDB = await this.userService.findByEmail(email)
      if (!userDB) {
        this.throwError(HTTP_CODES.notAuthenticated, 'Wrong email or password')
      }
      const user = User.fromDatabase(userDB)
      const isEqual = await this.cryptService.compare(password, user.pass)
      if (!isEqual) {
        this.throwError(HTTP_CODES.notAuthenticated, 'Wrong email or password')
      }
      const token = await this.cryptService.generateUserToken(user)
      return { token }
    } catch (e) {
      throw this.genericErrorHandler(e)
    }
  }
}

export default Login
