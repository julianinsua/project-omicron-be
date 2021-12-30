import { Db } from 'mongodb'

export interface DbConnection {
  connectToDatabase(): Promise<void>
  connection: Db | null
}
