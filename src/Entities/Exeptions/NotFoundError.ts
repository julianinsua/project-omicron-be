import BaseError from 'src/Entities/Exeptions/BaseError'
import { HTTP_CODES } from 'src/Entities/Interfaces/RouterInterfaces'

class NotFoundError extends BaseError {
  constructor(name: string, description: string, data: Record<string, any>) {
    super(name, HTTP_CODES.notFound, true, description, data)
  }
}

export default NotFoundError
