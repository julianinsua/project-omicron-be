import { dbAccess } from '../DbAccess'
import User from 'src/Entities/Models/User'
import CryptService from 'src/services/crypt/CryptService'
import generateId from 'src/util/generateId'
import COLLECTION_NAMES from 'src/util/constants/collectionNames'

class UserService {
  private cryptService: CryptService = new CryptService()

  public async create(user: User) {
    const hashedPassword = await this.cryptService.hashPassword(user.pass)
    user.setPassword(hashedPassword)
    return dbAccess.connection.collection(COLLECTION_NAMES.users).insertOne(user)
  }

  public async save(user: User) {
    if (user.isNewUser) {
      const hashedPassword = await this.cryptService.hashPassword(user.pass)
      user.setPassword(hashedPassword)
      user.setId(generateId())
      await dbAccess.connection.collection(COLLECTION_NAMES.users).insertOne(user)
      return user.userData
    }
    await dbAccess.connection.collection(COLLECTION_NAMES.users).replaceOne({ id: user.getId }, user)
    return user.userData
  }

  public findByEmail(email: string) {
    return dbAccess.connection.collection(COLLECTION_NAMES.users).findOne({ email: email })
  }

  public findById(id: string) {
    console.log(id)
  }
}

export default UserService
