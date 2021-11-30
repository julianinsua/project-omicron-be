import { Server } from 'src/services/http/Server'
import { dbAccess } from 'src/services/db/DbAccess'

const init = async () => {
  await dbAccess.connectToDatabase()
  new Server().startListening(8080)
  console.log('DONE')
}

init()
