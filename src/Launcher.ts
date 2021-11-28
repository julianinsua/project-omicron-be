import { Server } from 'src/services/http/Server'

new Server().startListening(8080)
console.log('DONE')
