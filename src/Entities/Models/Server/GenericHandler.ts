import { HTTP_CODES, requestInterface } from 'src/Entities/Interfaces/RouterInterfaces'
import { Error } from 'src/Entities/Interfaces/CommonInterfaces'

export abstract class GenericHandler {
  protected req: requestInterface

  protected constructor(req: requestInterface) {
    this.req = req
  }

  public handleRequest(): Object | Error {
    return {}
  }

  protected throwError(code: HTTP_CODES, message: string) {
    const error: any = {}
    error.error = new Error(message)
    error.status = code
    throw error
  }
  protected genericErrorHandler(e: any) {
    if (e.status) {
      return e
    } else {
      e.status = HTTP_CODES.internal
      return e
    }
  }
}
