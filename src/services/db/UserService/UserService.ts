import { dbAccess } from '../DbAccess'
import User from 'src/Entities/Models/User'
import CryptService from 'src/services/crypt/CryptService'

class UserService {
  public async create(user: User) {
    const cryptService = new CryptService()
    const hashedPassword = await cryptService.hashPassword(user.pass)
    user.setPassword(hashedPassword)
    return dbAccess.connection.collection('users').insertOne(user)
  }

  public save(user: User) {
    // TODO Logic to handle update
    return dbAccess.connection.collection('users').insertOne(user)
  }

  public findByEmail(email: string) {
    return dbAccess.connection.collection('users').findOne({ email: email })
  }

  public findById(id: string) {
    console.log(id)
  }
}

export default UserService
