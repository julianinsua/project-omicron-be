import { DbUserInterface } from 'src/Entities/Interfaces/UserInterfaces'

class User {
  private id: string //uuid
  private organization: string //should be a string or a org entitty
  private labs: Array<string> //should be a string uuid o a lab entity
  private username: string
  private password: string

  constructor(
    id: string,
    username: string,
    password: string,
    organization?: string,
    labs?: Array<string>
  ) {
    this.id = id
    this.organization = organization || ''
    this.labs = labs || []
    this.username = username
    this.password = password
  }

  public fromDatabase({ _id, username, password, organization, labs }: DbUserInterface): User {
    return new User(_id.toString(), username, password, organization, labs)
  }
}

export default User
