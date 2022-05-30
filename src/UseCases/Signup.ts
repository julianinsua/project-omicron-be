import { GenericHandler } from '../Entities/Models/Server/GenericHandler'
import User from 'src/Entities/Models/User'
import { HTTP_CODES, requestInterface } from 'src/Entities/Interfaces/RouterInterfaces'
import UserService from 'src/services/db/UserService'
import { signupInterface } from 'src/Entities/Interfaces/UserInterfaces'
import CryptService from 'src/services/crypt/CryptService'

class Signup extends GenericHandler {
  userService: UserService
  cryptService: CryptService

  constructor(req: requestInterface) {
    super(req)
    this.userService = new UserService()
    this.cryptService = new CryptService()
  }

  async handleRequest() {
    try {
      const { email, password, repeatPassword } = this.req.body as signupInterface

      if (password === repeatPassword) {
        const existingUser = await this.userService.findByEmail(email)

        if (existingUser) {
          this.throwError(HTTP_CODES.unprocessableEntity, 'Email already registered')
        }

        const user = User.createUser(email, password)
        if (user instanceof User) {
          // TODO Send mail to confirm valid email
          const createdUser = await this.userService.save(user)
          if (createdUser) {
            return { status: HTTP_CODES.ok, data: { createdUser } }
          } else {
            this.throwError(HTTP_CODES.internal, 'Failed to create user')
          }
        } else {
          this.throwError(HTTP_CODES.unprocessableEntity, 'Invalid email or password')
        }
      } else {
        this.throwError(HTTP_CODES.unprocessableEntity, 'Passwords are not equal')
      }
    } catch (e: any) {
      this.genericErrorHandler(e)
    }
  }
}

export default Signup
