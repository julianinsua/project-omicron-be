import { compare, hash } from 'bcryptjs'
import { sign, verify } from 'jsonwebtoken'
import { tokenDataInterface } from 'src/Entities/Interfaces/UserInterfaces'
import { randomBytes } from 'crypto'
import { RANDOM_BYTES_SIZE } from 'src/util/constants/commonConstants'

class CryptService {
  public generateUserToken = async (userTokenData: tokenDataInterface) => {
    // @ts-ignore
    return sign(userTokenData, process.env.TOKEN_SECRET, { expiresIn: '1h' })
  }

  public generateRandomToken = (): string => {
    const buffer = randomBytes(RANDOM_BYTES_SIZE)
    return buffer.toString('hex')
  }

  public static verifyToken = (token: string): Promise<any> => {
    // @ts-ignore
    return verify(token, process.env.TOKEN_SECRET)
  }

  public hashPassword = (password: string): Promise<string> => {
    return hash(password, 12)
  }

  public comparePassword = (password: string, hash: string): Promise<boolean> => {
    return compare(password, hash)
  }
}
export default CryptService
