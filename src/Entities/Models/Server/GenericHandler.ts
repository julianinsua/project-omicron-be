import { HTTP_CODES, requestInterface } from 'src/Entities/Interfaces/RouterInterfaces'
import BadRequestError from 'src/Entities/Exeptions/BadRequestError'
import NotAuthenticatedError from 'src/Entities/Exeptions/NotAuthenticatedError'
import NotFoundError from 'src/Entities/Exeptions/NotFoundError'
import InternalError from 'src/Entities/Exeptions/InternalError'
import BaseError from 'src/Entities/Exeptions/BaseError'
import { INTERNAL_ERROR } from 'src/Entities/Exeptions/ExeptionCodes'

export abstract class GenericHandler {
  protected req: requestInterface

  protected constructor(req: requestInterface) {
    this.req = req
  }

  public handleRequest(): Object | BaseError {
    return {}
  }

  protected throwError(name: string, code: HTTP_CODES, message: string, data?: any) {
    let error
    switch (code) {
      case HTTP_CODES.badRequest:
        error = new BadRequestError(name, message, data)
        break
      case HTTP_CODES.notAuthenticated:
        error = new NotAuthenticatedError(name, message, data)
        break
      case HTTP_CODES.notFound:
        error = new NotFoundError(name, message, data)
        break
      case HTTP_CODES.internal:
        error = new InternalError(name, true, message, data)
        break
      default:
        error = new InternalError(name, false, message, data)
    }
    throw error
  }

  protected genericErrorHandler(e: any) {
    if (e instanceof BaseError) {
      return e
    } else {
      return new InternalError(INTERNAL_ERROR, false, undefined, e.description)
    }
  }
}
