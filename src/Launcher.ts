import { Server } from 'src/services/http/Server'
import { dbAccess } from 'src/services/db/DbAccess'
import * as dotenv from 'dotenv'
dotenv.config()

// TODO Couldn't make top level await work so I created an async function and called it.
const init = async () => {
  await dbAccess.connectToDatabase()
  const port = parseInt(process?.env?.PORT || '8080')
  new Server().startListening(port)
  console.log('DONE')
}

init()
