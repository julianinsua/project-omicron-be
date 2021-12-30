import { HTTP_CODES } from 'src/Entities/Interfaces/RouterInterfaces'

export interface Error {
  status: HTTP_CODES
  error: Error
  payload?: Object
}
