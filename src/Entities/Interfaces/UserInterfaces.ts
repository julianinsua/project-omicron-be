import { ObjectId } from 'mongodb'

export interface DbUserInterface {
  _id: ObjectId
  username: string
  password: string
  organization: string
  labs: Array<string>
}
