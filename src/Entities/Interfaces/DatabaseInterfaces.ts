import { MongoClient } from 'mongodb'

export interface DbConnection {
  connectToDatabase(): Promise<void>
  connection: MongoClient | null
}
