import { GenericHandler } from 'src/Entities/Models/Server/GenericHandler'
import { HTTP_CODES, requestInterface } from 'src/Entities/Interfaces/RouterInterfaces'
import { resetPasswordInterface } from 'src/Entities/Interfaces/UserInterfaces'
import UserService from 'src/services/db/UserService'
import User from 'src/Entities/Models/User'
import CryptService from 'src/services/crypt/CryptService'

class ResetPassword extends GenericHandler {
  cryptService: CryptService
  userService: UserService

  constructor(req: requestInterface) {
    super(req)
    this.userService = new UserService()
    this.cryptService = new CryptService()
  }

  async handleRequest(): Promise<Object | Error> {
    try {
      const { token, email, password, repeatPassword } = this.req.body as resetPasswordInterface

      if (password !== repeatPassword) {
        throw this.throwError(HTTP_CODES.unprocessableEntity, 'Passwords must match')
      }

      const dbUser = await this.userService.findByEmail(email)
      console.log(dbUser)
      if (!dbUser) {
        throw this.throwError(HTTP_CODES.notFound, 'No user registered to that email')
      }
      const user = User.fromDatabase(dbUser)
      if (user.validateReset(token)) {
        user.setPassword(await this.cryptService.hashPassword(password))
        user.clearRestoreData()
        return this.userService.save(user)
      }
      throw this.throwError(HTTP_CODES.unprocessableEntity, 'Reset token is wrong or has expired')
    } catch (e) {
      throw this.genericErrorHandler(e)
    }
  }
}

export default ResetPassword
