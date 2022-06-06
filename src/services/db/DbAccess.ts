import { DbConnection } from 'src/Entities/Interfaces/DatabaseInterfaces'
import { MongoClient } from 'mongodb'
import * as dotenv from 'dotenv'

class DbAccess implements DbConnection {
  private db: MongoClient | null = null

  public constructor() {}

  public get connection() {
    return this.db!.db('Omicron')
  }

  public async connectToDatabase(): Promise<void> {
    dotenv.config()
    try {
      if (!process.env.DB_URL) {
        throw new Error('Environment error, check environmental variables')
      }

      if (process.env.DB_URL) {
        const client: MongoClient = new MongoClient(process.env.DB_URL)
        this.db = await client.connect()
        console.log('Connection to DB successful')
      }
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}

export const dbAccess = new DbAccess()
