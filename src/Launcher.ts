import { Server } from 'src/services/http/Server'
import { dbAccess } from 'src/services/db/DbAccess'

// TODO Couldn't make top level await work so I created an async function and called it.
const init = async () => {
  await dbAccess.connectToDatabase()
  new Server().startListening(8080)
  console.log('DONE')
}

init()
