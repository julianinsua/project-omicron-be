import { Server } from 'src/services/http/Server'
import { dbAccess } from 'src/services/db/DbAccess'
import * as dotenv from 'dotenv'
dotenv.config()

if (process.env.NODE_ENV !== 'development') {
}

const init = async () => {
  await dbAccess.connectToDatabase()

  const port = parseInt(process?.env?.PORT || '8080')
  new Server().startListening(port)
  console.log('SERVER ACTIVE')
}

init()
