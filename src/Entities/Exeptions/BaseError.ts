import { HTTP_CODES } from 'src/Entities/Interfaces/RouterInterfaces'

class BaseError extends Error {
  public statusCode: HTTP_CODES
  public isOperational?: boolean
  data?: Record<string, any>

  constructor(
    name: string,
    statusCode: HTTP_CODES,
    isOperational: boolean = false,
    description?: string | undefined,
    data?: Record<string, any>
  ) {
    super(description)

    Object.setPrototypeOf(this, new.target.prototype)
    this.name = name
    this.statusCode = statusCode
    this.isOperational = isOperational
    if (data) this.data = data
    Error.captureStackTrace(this)
  }
}

export default BaseError
