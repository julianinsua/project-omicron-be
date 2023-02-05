import UserService from 'src/services/db/UserService'
import CryptService from 'src/services/crypt/CryptService'
import { INVALID_LOGIN, INVALID_LOGIN_MSG } from 'src/Entities/Exeptions/ExeptionCodes'
import { HTTP_CODES } from 'src/Entities/Interfaces/RouterInterfaces'
import NotAuthenticatedError from 'src/Entities/Exeptions/NotAuthenticatedError'
import User from 'src/Entities/Models/User'

class LogInService {
  private userService: UserService
  private cryptService: CryptService

  constructor() {
    this.userService = new UserService()
    this.cryptService = new CryptService()
  }

  public async getValidUser(email: string, password: string) {
    const userDB = await this.userService.findByEmail(email)
    if (!userDB) {
      throw new NotAuthenticatedError(INVALID_LOGIN, INVALID_LOGIN_MSG)
    }
    return User.fromDatabase(userDB)
  }
}

export default LogInService
