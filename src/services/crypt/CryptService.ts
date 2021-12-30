import { compare, hash } from 'bcryptjs'
import { sign, verify } from 'jsonwebtoken'
import User from 'src/Entities/Models/User'

class CryptService {
  public compare(string: string, hash: string): Promise<boolean> {
    return compare(string, hash)
  }

  public async generateUserToken(user: User) {
    // @ts-ignore
    return sign(user.userData, process.env.TOKEN_SECRET, { expiresIn: '1h' })
  }

  public async verifyToken(token: string): Promise<any> {
    // @ts-ignore
    return verify(token, process.env.TOKEN_SECRET)
  }

  public async hashPassword(password: string): Promise<string> {
    return hash(password, 12)
  }
}
export default CryptService
