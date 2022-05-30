import { tokenDataInterface, userDataInterface } from 'src/Entities/Interfaces/UserInterfaces'
import { validEmail, validPassword } from 'src/util/constants/regularExpressions'
import { EXPIRATION_TIME } from 'src/util/constants/commonConstants'

class User {
  public id: string | undefined //uuid
  private organization: string //should be a string or an org entitty
  private labs: Array<string> //should be a string uuid or a lab entity
  public email: string
  private password: string
  private resetToken?: string = undefined
  private resetTokenExpiration?: number = undefined
  public permissions: Array<string>

  constructor(
    email: string,
    password: string,
    id?: string,
    organization?: string,
    labs?: Array<string>,
    permissions?: Array<string>
  ) {
    this.id = id
    this.organization = organization || ''
    this.labs = labs || []
    this.email = email
    this.password = password
    this.permissions = permissions || ['no']
  }

  public static fromDatabase({
    id,
    email,
    password,
    organization,
    labs,
    permissions,
    resetToken,
    resetTokenExpiration,
  }: any): User {
    const user = new User(email, password, id, organization, labs, permissions)
    if (resetToken && resetTokenExpiration) {
      user.setRestoreData(resetToken, resetTokenExpiration)
    }
    return user
  }

  public static createUser(email: string, password: string): boolean | User {
    const user = new User(email, password)
    if (user.validateCreation()) {
      return user
    }
    return false
  }

  public setPassword(password: string): void {
    this.password = password
  }

  public validateCreation() {
    return (
      validEmail.test(this.email) &&
      validPassword.test(this.password) &&
      this.permissions.length > 0
    )
  }

  public validateReset(token: string): boolean {
    if (this.resetToken && this.resetTokenExpiration) {
      return this.resetTokenExpiration >= Date.now() && this.resetToken === token
    }
    return false
  }

  public setId(id: string) {
    this.id = id
  }

  public setRestoreData(token: string, resetTokenExpiration = Date.now() + EXPIRATION_TIME) {
    this.resetToken = token
    this.resetTokenExpiration = resetTokenExpiration
  }

  public clearRestoreData() {
    this.resetToken = undefined
    this.resetTokenExpiration = undefined
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

  get tokenData(): tokenDataInterface {
    return { id: this.id!, email: this.email, labs: this.labs, organization: this.organization }
  }

  get isNewUser(): boolean {
    return !this.id
  }

  get getId(): string | undefined {
    return this.id
  }

  get getResetToken(): string | undefined {
    return this.resetToken
  }
}

export default User
