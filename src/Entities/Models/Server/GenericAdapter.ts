import { NextFunction, Request, Response } from 'express'
import { HTTP_CODES, requestInterface } from 'src/Entities/Interfaces/RouterInterfaces'
import { GenericHandler } from './GenericHandler'

abstract class GenericAdapter {
  //prevents depending on framework's request on use cases.
  protected static getRequest(req: Request): requestInterface {
    const { body, url, query, params } = req
    const request: requestInterface = { url }
    if (body) request.body = body
    if (query) request.query = query
    if (params) request.params = params

    return request
  }

  protected static createHandler(bridgeClass: GenericHandler) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        bridgeClass.setReq(this.getRequest(req))
        const response = bridgeClass.handleRequest()
        res.status(HTTP_CODES.ok).json(response)
      } catch (e: any) {
        if (e) {
          next(e)
        }
      }
    }
  }
}

export default GenericAdapter
