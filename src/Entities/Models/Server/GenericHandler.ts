import { Request, Response } from 'express'
import { HTTP_CODES } from 'src/Entities/Interfaces/RouterInterfaces'

export abstract class GenericHandler {
  protected req: Request
  protected res: Response

  protected constructor(req: Request, res: Response) {
    this.req = req
    this.res = res
  }

  abstract handleRequest(): void

  protected writeResponse(status: HTTP_CODES, payload: any) {
    return this.res.status(status).json(payload)
  }
}
