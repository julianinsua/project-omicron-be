import BaseError from 'src/Entities/Exeptions/BaseError'
import { HTTP_CODES } from 'src/Entities/Interfaces/RouterInterfaces'
import { INTERNAL_ERROR, INTERNAL_ERROR_MSG } from 'src/Entities/Exeptions/ExeptionCodes'

class InternalError extends BaseError {
  constructor(
    name: string = INTERNAL_ERROR,
    isOperational: boolean = false,
    description = INTERNAL_ERROR_MSG,
    data?: Record<string, any>
  ) {
    super(name, HTTP_CODES.internal, isOperational, description, data)
  }
}

export default InternalError
