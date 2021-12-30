import { userDataInterface } from 'src/Entities/Interfaces/UserInterfaces'
import generateId from 'src/util/generateId'
import { validEmail, validPassword } from 'src/util/constants/regularExpressions'

class User {
  private readonly id: string | undefined //uuid
  private organization: string //should be a string or an org entitty
  private labs: Array<string> //should be a string uuid or a lab entity
  private readonly email: string
  private password: string

  constructor(
    email: string,
    password: string,
    id?: string,
    organization?: string,
    labs?: Array<string>
  ) {
    this.id = id
    this.organization = organization || ''
    this.labs = labs || []
    this.email = email
    this.password = password
  }

  public static fromDatabase({ id, email, password, organization, labs }: any): User {
    return new User(email, password, id, organization, labs)
  }

  public static createUser(email: string, password: string): boolean | User {
    const user = new User(email, password, generateId())
    if (user.validateCreation()) {
      return user
    }
    return false
  }

  public setPassword(password: string): void {
    this.password = password
  }

  public validateCreation() {
    return validEmail.test(this.email) && validPassword.test(this.password)
  }

  get pass() {
    return this.password
  }

  get userData(): userDataInterface {
    const userObject: userDataInterface = {
      email: this.email,
      labs: this.labs,
      organization: this.organization,
    }

    if (this.id) {
      userObject.id = this.id
    }
    return userObject
  }
}

export default User
